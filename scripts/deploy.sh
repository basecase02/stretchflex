#!/usr/bin/env bash
# Build the site and publish it to AWS (Basecase account, Sydney).
#   scripts/deploy.sh              build + infra + upload
#   scripts/deploy.sh --site-only  build + upload (no CloudFormation change)
# Settings: STACK (default raymancini-stretchflex-prod), AWS_PROFILE (default basecase02),
# and in infra/deploy.env: DOMAIN, CERT_ARN, ZONE_ID (empty until the domain moves).
set -euo pipefail
cd "$(dirname "$0")/.."
export AWS_PROFILE="${AWS_PROFILE:-basecase02}" AWS_REGION=ap-southeast-2
STACK="${STACK:-raymancini-stretchflex-prod}"
DOMAIN="" CERT_ARN="" ZONE_ID=""
[ -f infra/deploy.env ] && . infra/deploy.env

echo "==> Building pages"
npx next build >/dev/null
echo "==> Resizing images"
node scripts/build-images.mjs

if [ "${1:-}" != "--site-only" ]; then
  echo "==> Deploying stack $STACK"
  node infra/build.mjs stretchflex.au
  node scripts/build-api.mjs
  if [ -n "$DOMAIN" ]; then ORIGIN="https://$DOMAIN"; else
    ORIGIN="https://$(aws cloudformation describe-stacks --stack-name "$STACK" --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDomain'].OutputValue" --output text 2>/dev/null)"; fi
  sam deploy --template-file infra/template.yaml --stack-name "$STACK" --resolve-s3 \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset --no-confirm-changeset \
    --tags project=raymancini site=stretchflex env=prod \
    --parameter-overrides "ParameterKey=DomainName,ParameterValue=$DOMAIN" "ParameterKey=CertificateArn,ParameterValue=$CERT_ARN" "ParameterKey=HostedZoneId,ParameterValue=$ZONE_ID" "ParameterKey=SiteOrigin,ParameterValue=$ORIGIN"
fi

out() { aws cloudformation describe-stacks --stack-name "$STACK" --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text; }
BUCKET=$(out SiteBucketName); DIST=$(out DistributionId)

echo "==> Uploading to s3://$BUCKET"
# Hashed build files and resized images never change: cache them for a year.
aws s3 sync out/_next "s3://$BUCKET/_next" --delete --cache-control "public,max-age=31536000,immutable" --only-show-errors
aws s3 sync out/_img "s3://$BUCKET/_img" --delete --cache-control "public,max-age=31536000,immutable" --only-show-errors
aws s3 sync out "s3://$BUCKET" --delete --exclude "_next/*" --exclude "_img/*" --exclude "feed" --exclude "comments/feed" \
  --cache-control "public,max-age=0,must-revalidate" --only-show-errors
for f in feed comments/feed; do
  aws s3 cp "out/$f" "s3://$BUCKET/$f" --content-type "application/rss+xml; charset=UTF-8" --cache-control "public,max-age=0,must-revalidate" --only-show-errors
done

echo "==> Clearing the CloudFront cache"
aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*" --query Invalidation.Id --output text
echo "==> Live at https://$(out CloudFrontDomain)${DOMAIN:+ and https://$DOMAIN}"

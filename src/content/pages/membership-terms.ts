import type { PageContent } from "./types";

/** /membership-terms: the terms from the client's content document, word for word. */
const html = `
<h2>1. Memberships</h2>
<div class="tbl" role="region" aria-label="Memberships" tabindex="0">
<table style="display: table">
  <thead><tr><th scope="col">Membership</th><th scope="col">Included each week</th><th scope="col">Weekly price</th><th scope="col">Minimum term</th></tr></thead>
  <tbody>
    <tr><td data-label="Membership">Revive</td><td data-label="Included each week">2 × 30-min Revive Stretch</td><td data-label="Weekly price">$89</td><td data-label="Minimum term">3 months</td></tr>
    <tr><td data-label="Membership">Prime</td><td data-label="Included each week">2 × 45-min Prime Mobility Stretch</td><td data-label="Weekly price">$139</td><td data-label="Minimum term">3 months</td></tr>
    <tr><td data-label="Membership">Ultimate</td><td data-label="Included each week">2 × 60-min The Ultimate Stretch</td><td data-label="Weekly price">$180</td><td data-label="Minimum term">3 months</td></tr>
    <tr><td data-label="Membership">Bronze</td><td data-label="Included each week">2 × 44-min Photobiotic Assisted Stretching™ + 1 De-Compression Recovery Stack</td><td data-label="Weekly price">$250</td><td data-label="Minimum term">4 weeks</td></tr>
    <tr><td data-label="Membership">Silver</td><td data-label="Included each week">2 × 59-min Photobiotic Assisted Stretching™ + 1 De-Compression Recovery Stack</td><td data-label="Weekly price">$295</td><td data-label="Minimum term">4 weeks</td></tr>
    <tr><td data-label="Membership">Gold</td><td data-label="Included each week">2 × 74-min Photobiotic Assisted Stretching™ + 1 De-Compression Recovery Stack</td><td data-label="Weekly price">$330</td><td data-label="Minimum term">4 weeks</td></tr>
  </tbody>
</table>
</div>
<p>All prices are in Australian dollars and include GST.</p>

<h2>2. Billing</h2>
<ul>
  <li>Memberships are billed weekly in advance by direct debit from the account or card you nominate.</li>
  <li>Your first payment is taken when you join, and then on the same day each week.</li>
  <li>If a payment fails, we will notify you and try again. We may pause your bookings until your account is up to date.</li>
  <li>You must tell us if your payment details change.</li>
</ul>

<h2>3. Minimum term</h2>
<ul>
  <li>Assisted Stretching Memberships have a minimum term of three months (13 weekly payments).</li>
  <li>Performance &amp; Recovery Memberships have a minimum term of four weeks.</li>
  <li>After the minimum term, your membership continues week to week until you cancel.</li>
</ul>

<h2>4. Using your sessions</h2>
<ul>
  <li>Your sessions are allocated each week and do not carry over to the following week.</li>
  <li>We recommend booking your regular times in advance. Members receive priority booking, but all bookings are subject to availability.</li>
  <li>Sessions cancelled with less than 24 hours notice, and missed appointments, are forfeited.</li>
  <li>Your membership is for you only and cannot be shared or transferred.</li>
</ul>

<h2>5. Holds</h2>
<p>Each membership includes one hold of up to 30 days, requested in writing at least 7 days before it starts. Billing is paused during the hold, and the hold period does not count towards your minimum term. Additional holds are not available.</p>

<h2>6. Changing your membership</h2>
<ul>
  <li>You can upgrade to a higher tier at any time. The new weekly price applies from your next billing date.</li>
  <li>You can change to a lower tier after your minimum term.</li>
</ul>

<h2>7. Cancelling your membership</h2>
<ul>
  <li>You may cancel at any time after your minimum term by giving written notice by email to <a href="mailto:info@stretchflex.au">info@stretchflex.au</a> or in person at the studio.</li>
  <li>Cancellation takes effect at the end of your current weekly billing cycle. Any sessions remaining in that week can still be used.</li>
  <li>If you have a serious illness, injury or permanent move that prevents you from using your membership, please speak to us. We will consider early cancellation on a case-by-case basis, and may ask for supporting documents.</li>
</ul>

<h2>8. Price changes</h2>
<p>We will give you at least 30 days written notice of any change to your weekly price. Prices will not change during your minimum term.</p>

<h2>9. Member benefits</h2>
<p>Member benefits, including priority booking, member resources, event and workshop invitations and product savings, are offered at our discretion and may change over time. They have no cash value.</p>

<h2>10. Health and suitability</h2>
<ul>
  <li>You must complete our health questionnaire before your first session and tell us of any changes to your health.</li>
  <li>Our services support general mobility, recovery and wellbeing. They are not medical treatment and do not replace advice from your doctor or physiotherapist.</li>
  <li>Some services, including light therapy, compression and vagus nerve stimulation, are not suitable for everyone. We may decline or adjust a service if it is not suitable for you.</li>
</ul>

<h2>11. Studio conduct</h2>
<ul>
  <li>A clean, unworn pair of socks is compulsory for every session. Grip socks are available at reception for $15.</li>
  <li>Please arrive on time and treat our team and other clients with respect.</li>
  <li>We may suspend or cancel a membership for abusive behaviour, repeated no-shows or non-payment. If we cancel your membership for any other reason, we will refund any payments for sessions not yet provided.</li>
</ul>

<h2>12. Your rights</h2>
<p>Nothing in these terms excludes, restricts or modifies any rights you have under the Australian Consumer Law.</p>

<h2>13. Governing law</h2>
<p>These terms are governed by the laws of Western Australia.</p>
`;

export const page: PageContent = {
  seo: {
    title: "Membership Terms and Conditions | StretchFLEX",
    description:
      "The terms that apply to StretchFLEX Assisted Stretching and Performance & Recovery Memberships, including billing, minimum terms, holds and cancellation.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Policies and terms",
      title: "Membership Terms and Conditions",
      intro: [
        "Last updated: 14 November 2026",
        'These terms apply to all StretchFLEX memberships. StretchFLEX is operated by Wellbeing Beyond Wellness Pty Ltd, ABN 42 687 612 611 ("we", "us"). By joining, you ("member") agree to these terms, our [Refund and Cancellation Policy](/refund-and-cancellation-policy) and our [Privacy Policy](/privacy-policy).',
      ],
    },
    { type: "prose", html },
  ],
};

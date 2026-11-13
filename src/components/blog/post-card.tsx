import "@/styles/blog.css";
import Image from "next/image";
import Link from "next/link";
import { formatDate, type PostCard as Card } from "./posts";
import { photoFrame, photoSize } from "@/lib/photo";

/** A linked blog card as on the live blog: photo, date (and reading time), title. */
export function PostCard({ post, featured = false, hidden = false }: { post: Card; featured?: boolean; hidden?: boolean }) {
  // Cards are 16:9. A photo of another shape (a square one) is shown whole,
  // over a blurred copy of itself, instead of losing its top and bottom.
  const odd = post.image ? Math.abs(photoSize(post.image.src).ratio - 16 / 9) > 0.25 : false;
  const sizes = featured ? "(min-width: 900px) 55vw, 100vw" : "(min-width: 1100px) 30vw, 50vw";
  return (
    <li className={`post-card${featured ? " post-card--featured" : ""}`} hidden={hidden}>
      <Link className="post-card__link" href={post.path}>
        <figure className="post-card__pic" {...photoFrame(post.image)}>
          {post.image && odd ? (
            <Image className="post-card__backdrop" src={post.image.src} alt="" aria-hidden="true" fill sizes={sizes} />
          ) : null}
          {post.image ? (
            <Image
              className={odd ? "post-card__img--whole" : undefined}
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes={sizes}
              priority={featured}
            />
          ) : null}
        </figure>
        <div className="post-card__copy">
          <p className="post-card__meta caps">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="post-card__mins">
              <span aria-hidden="true"> · </span>
              {post.minutes} min read
            </span>
          </p>
          <h3 className="display post-card__title">{post.title}</h3>
        </div>
      </Link>
    </li>
  );
}

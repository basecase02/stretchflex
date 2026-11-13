import "@/styles/blog.css";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { formatDate, getPost, POSTS, toCard } from "@/components/blog/posts";
import { CtaBand } from "@/components/sections";
import { ReadProgress } from "@/components/read-progress";
import { JsonLd } from "@/components/text";
import { BOOK_URL } from "@/content/site";
import { pageMetadata, seoFor } from "@/lib/seo";
import { photoFrame } from "@/lib/photo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  return post ? pageMetadata(post.path) : {};
}

/** /blogs/<slug> — one article: title and date, the photo, the text, then three more. */
export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const schema = seoFor(post.path).schema;
  const index = POSTS.indexOf(post);
  const more = [...POSTS.slice(index + 1), ...POSTS.slice(0, index)].slice(0, 3);

  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      {post.jsonLd.map((data, i) => (
        <JsonLd data={data} key={i} />
      ))}

      <ReadProgress />

      <section className="hero hero--page hero--solo post-hero panel">
        <div className="hero__card">
          <nav className="crumbs caps" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ol>
          </nav>
          <h1 className="hero__title">{post.title}</h1>
          <ul className="facts">
            <li>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </li>
            <li>{post.minutes} min read</li>
          </ul>
        </div>
      </section>

      <article className="blk blk--blush panel article">
        <div className="wrap">
          {post.image ? (
            <figure className="article__pic" {...photoFrame(post.image)}>
              <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(min-width: 900px) 860px, 100vw" />
            </figure>
          ) : null}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="article__foot">
            <Link className="btn btn--caps btn--outline" href="/blog">
              ← Blog
            </Link>
            <a className="btn btn--caps btn--red" href={BOOK_URL}>
              Book Appointment
            </a>
          </div>
        </div>
      </article>

      <CtaBand />

      <section className="blk blk--rose panel">
        <div className="wrap">
          <header className="blk__head blk__head--center">
            <h2 className="display blk__title">Latest Articles</h2>
          </header>
          <ul className="blog__grid blog__grid--three">
            {more.map((other) => (
              <PostCard post={toCard(other)} key={other.slug} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

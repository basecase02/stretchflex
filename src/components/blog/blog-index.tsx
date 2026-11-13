"use client";

import Link from "next/link";
import { useDeferredValue, useId, useState, type FormEvent } from "react";
import { PostCard } from "./post-card";
import type { PostCard as Card } from "./posts";

const pageHref = (n: number) => (n <= 1 ? "/blog" : `/blog/page/${n}`);

/**
 * One page of the blog list (the newest post large on page 1), with page
 * links, and the "Search" box, which searches every post as you type.
 */
export function BlogIndex({ posts, all, page, pageCount }: { posts: Card[]; all: Card[]; page: number; pageCount: number }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const searchId = useId();
  const headingId = useId();

  const searching = deferred.length > 0;
  const matches = (post: Card) => `${post.title} ${post.excerpt}`.toLowerCase().includes(deferred);
  const results = searching ? all.filter(matches) : [];
  const [featured, ...rest] = posts;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery((value) => value.trim());
  };

  return (
    <div className="blog">
      <section className="blog__finder" aria-labelledby={headingId}>
        <h2 className="display blog__finder-title" id={headingId}>
          Search
        </h2>
        <form className="blog__search" role="search" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor={searchId}>
            Search
          </label>
          <input id={searchId} type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" className="btn btn--caps btn--navy">
            Search
          </button>
        </form>
      </section>
      <p className="sr-only" aria-live="polite">
        {searching ? `${results.length} of ${all.length} articles` : ""}
      </p>

      {searching ? (
        results.length ? (
          <ul className="blog__grid">
            {results.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </ul>
        ) : (
          <p className="blog__empty">No articles match “{query.trim()}”.</p>
        )
      ) : (
        <>
          <ul className="blog__grid">
            {page === 1 ? <PostCard post={featured} featured /> : <PostCard post={featured} />}
            {rest.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </ul>
          {pageCount > 1 ? (
            <nav className="pager" aria-label="Blog pages">
              {page > 1 ? (
                <Link className="pager__step" href={pageHref(page - 1)} rel="prev">
                  ← Newer
                </Link>
              ) : (
                <span className="pager__step" aria-hidden="true" data-off />
              )}
              <ol className="pager__list">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <Link className="pager__num" href={pageHref(n)} aria-current={n === page ? "page" : undefined}>
                      <span className="sr-only">Page </span>
                      {n}
                    </Link>
                  </li>
                ))}
              </ol>
              {page < pageCount ? (
                <Link className="pager__step" href={pageHref(page + 1)} rel="next">
                  Older →
                </Link>
              ) : (
                <span className="pager__step" aria-hidden="true" data-off />
              )}
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}

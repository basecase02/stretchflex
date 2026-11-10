"use client";

import { useDeferredValue, useId, useState, type FormEvent } from "react";
import { PostCard } from "./post-card";
import type { PostCard as Card } from "./posts";

/**
 * The blog list as on the live page: every post (newest large), then the
 * "Search" box, which here filters the list as you type. Every post is in the
 * HTML; a search only hides the ones that don't match.
 */
export function BlogIndex({ posts }: { posts: Card[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const searchId = useId();
  const headingId = useId();

  const searching = deferred.length > 0;
  const matches = (post: Card) => !searching || `${post.title} ${post.excerpt}`.toLowerCase().includes(deferred);
  const count = posts.filter(matches).length;
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
        {searching ? `${count} of ${posts.length}` : ""}
      </p>

      <ul className="blog__grid">
        <PostCard post={featured} featured={!searching} hidden={!matches(featured)} />
        {rest.map((post) => (
          <PostCard post={post} key={post.slug} hidden={!matches(post)} />
        ))}
      </ul>
    </div>
  );
}

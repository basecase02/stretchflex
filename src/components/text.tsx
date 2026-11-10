import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Sets one word of a phrase in the handwritten face. The text itself is
 * unchanged, so headings read exactly as they do in the content file.
 */
export function hand(text: string, word?: string): ReactNode {
  if (!word) return text;
  const at = text.indexOf(word);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="hand">{word}</span>
      {text.slice(at + word.length)}
    </>
  );
}

/** A link that uses client-side navigation for pages on this site. */
export function SmartLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; "aria-label"?: string }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a className={className} href={href} {...(newTab ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Inline formatting for content strings: [label](href) links and **bold**.
 * Everything else is plain text, so content files stay readable.
 */
export function rich(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(
        <SmartLink key={key++} href={match[2]}>
          {match[1]}
        </SmartLink>,
      );
    } else {
      parts.push(<strong key={key++}>{match[3]}</strong>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

/** Structured data, escaped so it cannot close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

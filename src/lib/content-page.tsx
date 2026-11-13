import type { Metadata } from "next";
import { Blocks } from "@/components/blocks";
import { BookingBar } from "@/components/booking-bar";
import { bookActions, bookOptions, withSessionButtons } from "@/lib/booking";
import { JsonLd } from "@/components/text";
import { PAGES } from "@/content/pages";
import { pageMetadata, seoFor } from "@/lib/seo";

/**
 * A rebuilt WordPress page: the live page's title, description and
 * structured data, and its content as blocks from src/content/pages.
 *
 *   const { metadata, Page } = contentPage("/about");
 *   export { metadata };
 *   export default Page;
 */
export function contentPage(path: keyof typeof PAGES): { metadata: Metadata; Page: () => React.JSX.Element } {
  const content = PAGES[path];
  const source = content.seoFrom ?? path;
  const seo = seoFor(source);
  // A moved page's structured data names its old URL, so it is left out.
  const schema = content.seoFrom ? null : seo.schema;
  const options = content.sessions ? bookOptions(content.sessions) : null;
  const blocks = options ? withSessionButtons(content.blocks, bookActions(options)) : content.blocks;
  function Page() {
    return (
      <>
        {schema ? <JsonLd data={schema} /> : null}
        <Blocks blocks={blocks} />
        {options ? <BookingBar title={content.bookingTitle ?? options[0].name} options={options} /> : null}
      </>
    );
  }
  const base = pageMetadata(source);
  const metadata: Metadata = {
    ...base,
    ...(content.title ? { title: content.title } : {}),
    alternates: { ...base.alternates, canonical: path },
    openGraph: { ...base.openGraph, url: path, ...(content.title ? { title: content.title } : {}) },
    ...(content.noindex ? { robots: { index: false, follow: false } } : {}),
  };
  return { metadata, Page };
}

import type { Metadata } from "next";
import { Blocks } from "@/components/blocks";
import { BookingBar } from "@/components/booking-bar";
import { bookActions, bookOptions, withSessionButtons } from "@/lib/booking";
import { JsonLd } from "@/components/text";
import { PAGES } from "@/content/pages";
import { hasSeo, pageMetadata, seoFor } from "@/lib/seo";
import type { PageContent } from "@/content/pages/types";

/**
 * A rebuilt WordPress page: the live page's title, description and
 * structured data, and its content as blocks from src/content/pages.
 *
 *   const { metadata, Page } = contentPage("/about");
 *   export { metadata };
 *   export default Page;
 */
export function contentPage(path: keyof typeof PAGES): { metadata: Metadata; Page: () => React.JSX.Element } {
  const content: PageContent = PAGES[path];
  const source = content.seoFrom ?? path;
  // New pages have no live snapshot; their SEO comes from content.seo.
  const snapshot = hasSeo(source) ? seoFor(source) : null;
  // A moved page's structured data names its old URL, so it is left out.
  const schema = content.seoFrom ? null : (snapshot?.schema ?? null);
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
  const base: Metadata = snapshot
    ? pageMetadata(source)
    : {
        openGraph: {
          locale: "en_AU",
          type: "website",
          siteName: "StretchFLEX",
          images: [{ url: "/images/team/stretchflex-team-reception.jpg", width: 2000, height: 1499 }],
        },
        twitter: { card: "summary_large_image" },
      };
  const seo = content.seo;
  const title = seo?.title ?? content.title;
  const description = seo?.description;
  const metadata: Metadata = {
    ...base,
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    alternates: { ...base.alternates, canonical: path },
    openGraph: {
      ...base.openGraph,
      url: path,
      ...(title ? { title: seo?.ogTitle ?? title } : {}),
      ...(description ? { description: seo?.ogDescription ?? description } : {}),
    },
    ...(content.noindex ? { robots: { index: false, follow: false } } : {}),
  };
  return { metadata, Page };
}

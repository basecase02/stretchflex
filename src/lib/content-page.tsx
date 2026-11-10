import type { Metadata } from "next";
import { Blocks } from "@/components/blocks";
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
  const seo = seoFor(path);
  function Page() {
    return (
      <>
        {seo.schema ? <JsonLd data={seo.schema} /> : null}
        <Blocks blocks={content.blocks} />
      </>
    );
  }
  return { metadata: { ...pageMetadata(path), ...(content.noindex ? { robots: { index: false, follow: false } } : {}) }, Page };
}

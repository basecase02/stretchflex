import type { Metadata } from "next";
import { Blocks } from "@/components/blocks";
import { BookingBar } from "@/components/booking-bar";
import { SeoTags } from "@/components/seo-tags";
import { bookActions, bookOptions, withSessionButtons } from "@/lib/booking";
import { JsonLd } from "@/components/text";
import { PAGES } from "@/content/pages";
import { localBusiness } from "@/content/schema";
import { SESSION_GROUPS, SESSIONS, SITE_URL } from "@/content/site";
import { hasSeo, newPageEntry, pageMetadata, seoFor, type SeoEntry } from "@/lib/seo";
import type { PageContent } from "@/content/pages/types";

/**
 * A rebuilt WordPress page: the live page's SEO (title, description, robots,
 * canonical, Open Graph and structured data, exactly as Yoast prints them)
 * and its content as blocks from src/content/pages.
 *
 *   const { metadata, Page } = contentPage("/about");
 *   export { metadata };
 *   export default Page;
 */
export function contentPage(path: keyof typeof PAGES): { metadata: Metadata; Page: () => React.JSX.Element } {
  const content: PageContent = PAGES[path];
  const entry = seoOf(path, content);
  const options = content.sessions ? bookOptions(content.sessions) : null;
  // Service pages also describe their sessions for search (name, length, price, provider).
  const services = content.sessions && path.startsWith("/our-packages/") ? serviceData(content.sessions) : null;
  const blocks = options ? withSessionButtons(content.blocks, bookActions(options)) : content.blocks;

  function Page() {
    return (
      <>
        <SeoTags entry={entry} path={path} />
        {entry.schema ? <JsonLd data={entry.schema} /> : null}
        {services ? <JsonLd data={services} /> : null}
        <Blocks blocks={blocks} />
        {options ? <BookingBar title={content.bookingTitle ?? options[0].name} options={options} /> : null}
      </>
    );
  }

  return { metadata: pageMetadata(entry, path), Page };
}

/** Service structured data for the sessions a page sells, from SESSIONS (the same names and prices as on the page). */
function serviceData(ids: string[]) {
  const provider = {
    "@type": localBusiness["@type"],
    "@id": localBusiness["@id"],
    name: localBusiness.name,
    url: localBusiness.url,
    telephone: localBusiness.telephone,
    address: localBusiness.address,
  };
  return {
    "@context": "https://schema.org",
    "@graph": ids.map((id) => {
      const session = SESSIONS.find((s) => s.id === id)!;
      const group = SESSION_GROUPS.find((g) => (g.sessionIds as readonly string[]).includes(id));
      return {
        "@type": "Service",
        name: session.name,
        ...(group ? { serviceType: group.title } : {}),
        description: `${session.duration}. ${session.body ?? session.lead}.`.replace(/\.\.$/, "."),
        url: `${SITE_URL}${session.learnHref}`,
        provider,
        areaServed: { "@type": "City", name: "Perth" },
        offers: {
          "@type": "Offer",
          price: session.price.toFixed(2),
          priceCurrency: "AUD",
          url: `${SITE_URL}${session.bookHref ?? session.learnHref}`,
        },
      };
    }),
  };
}

/** The live page's SEO; pages the live site doesn't have use their own (content.seo), in the same format. */
function seoOf(path: string, content: PageContent): SeoEntry {
  const source = content.seoFrom ?? path;
  if (hasSeo(source)) return seoFor(source, content.seoRename);
  const own = content.seo ?? (content.title ? { title: content.title } : null);
  if (!own) throw new Error(`${path} has no live SEO and no content.seo`);
  return newPageEntry(path, own, content.noindex);
}

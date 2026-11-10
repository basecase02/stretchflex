import { benefitTemplate } from "@/components/pages/utility/benefit-template";
import type { PageContent } from "./types";

/** /risk-of-injury — an unfinished template page on the live site (noindex); carried over as is. */
export const page: PageContent = {
  blocks: benefitTemplate("Risk of Injury", "Improve muscle flexibility and strength, helping to prevent strains and other injuries."),
  noindex: true,
};

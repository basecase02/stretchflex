import { benefitTemplate } from "@/components/pages/utility/benefit-template";
import type { PageContent } from "./types";

/** /muscle-tension-and-stiffness — an unfinished template page on the live site (noindex); carried over as is. */
export const page: PageContent = {
  blocks: benefitTemplate("Muscle Tension and Stiffness", "Release tightness and knots that can cause pain and discomfort."),
  noindex: true,
};

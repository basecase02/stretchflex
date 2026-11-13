/**
 * Every rebuilt inner page, by its URL path. Each file holds the page's
 * blocks; the route under src/app renders it with the live page's SEO.
 */
import { page as ourPackages } from "./our-packages";
import { page as theReviveStretchSession } from "./the-revive-stretch-session";
import { page as thePrimeMobilityStretchSession } from "./the-prime-mobility-stretch-session";
import { page as theUltimateStretch } from "./the-ultimate-stretch";
import { page as rapidRejuvenation } from "./rapid-rejuvenation";
import { page as photobioticAssistedStretching } from "./photobiotic-assisted-stretching";
import { page as redLightTherapyBenefits } from "./red-light-therapy-benefits";
import { page as firstTimeVisitors } from "./first-time-visitors";
import { page as assistedStretchingPerth } from "./assisted-stretching-perth";
import { page as about } from "./about";
import { page as biljanaMancini } from "./biljana-mancini";
import { page as drJoeKosterich } from "./dr-joe-kosterich";
import { page as membership } from "./membership";
import { page as faqs } from "./faqs";
import { page as contactUs } from "./contact-us";
import { page as bookYourSession } from "./book-your-session";
import { page as refundAndCancellationPolicy } from "./refund-and-cancellation-policy";
import { page as thankYou } from "./thank-you";
import { page as thankYouBooking } from "./thank-you-booking";
import { page as riskOfInjury } from "./risk-of-injury";
import { page as muscleTensionAndStiffness } from "./muscle-tension-and-stiffness";
import { page as goodlife } from "./goodlife";
import { page as stretchflexGoodlife } from "./stretchflex-goodlife";

export const PAGES = {
  "/our-packages": ourPackages,
  "/our-packages/the-revive-stretch-session": theReviveStretchSession,
  "/our-packages/the-prime-mobility-stretch-session": thePrimeMobilityStretchSession,
  "/our-packages/the-ultimate-stretch": theUltimateStretch,
  "/our-packages/rapid-rejuvenation": rapidRejuvenation,
  "/our-packages/photobiotic-assisted-stretching": photobioticAssistedStretching,
  "/our-packages/red-light-therapy-benefits": redLightTherapyBenefits,
  "/first-time-visitors": firstTimeVisitors,
  "/assisted-stretching-perth": assistedStretchingPerth,
  "/about": about,
  "/biljana-mancini": biljanaMancini,
  "/dr-joe-kosterich": drJoeKosterich,
  "/membership": membership,
  "/faqs": faqs,
  "/contact-us": contactUs,
  "/book-your-session": bookYourSession,
  "/refund-and-cancellation-policy": refundAndCancellationPolicy,
  "/thank-you": thankYou,
  "/thank-you-booking": thankYouBooking,
  "/risk-of-injury": riskOfInjury,
  "/muscle-tension-and-stiffness": muscleTensionAndStiffness,
  "/goodlife": goodlife,
  "/stretchflex-goodlife": stretchflexGoodlife,
};

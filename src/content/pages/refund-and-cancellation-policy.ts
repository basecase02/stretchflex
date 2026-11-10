import "@/styles/utility.css";
import type { PageContent } from "./types";

/** /refund-and-cancellation-policy — the policy text from the live page, unchanged. */
const html = "<nav class=\"policy-toc\" aria-label=\"Table of Contents\"><h4>Table of Contents</h4><ol><li><a href=\"#1-appointment-cancellations\">1. APPOINTMENT CANCELLATIONS</a></li><li><a href=\"#2-package-purchases\">2. PACKAGE PURCHASES</a></li><li><a href=\"#3-cash-payments\">3. CASH PAYMENTS</a></li><li><a href=\"#4-membership-terms\">4. MEMBERSHIP TERMS</a></li><li><a href=\"#5-general-terms\">5. GENERAL TERMS</a></li><li><a href=\"#6-contact-information\">6. CONTACT INFORMATION</a></li></ol></nav>\n<h2 id=\"1-appointment-cancellations\">1. APPOINTMENT CANCELLATIONS</h2>\n<h3>1.1 Full Refund (48+ Hours Notice)</h3>\n<p>Clients who cancel their scheduled appointment at least 48 hours prior to the appointment time are entitled to a full refund of the appointment fee.</p>\n<h3>1.2 Partial Refund (24-48 Hours Notice)</h3>\n<p>Clients who cancel their scheduled appointment between 24 and 48 hours prior to the appointment time will receive a 50% refund of the appointment fee.</p>\n<h3>1.3 No Refund (Less Than 24 Hours Notice)</h3>\n<p>Cancellations made less than 24 hours prior to the scheduled appointment time, or no-shows, are not eligible for any refund.</p>\n<h2 id=\"2-package-purchases\">2. PACKAGE PURCHASES</h2>\n<h3>2.1 Non-Refundable</h3>\n<p>All service packages purchased at StretchFLEX are non-refundable once payment has been processed.</p>\n<h3>2.2 Non-Transferable</h3>\n<p>Service packages are non-transferable and cannot be transferred to another person or account.</p>\n<h2 id=\"3-cash-payments\">3. CASH PAYMENTS</h2>\n<p>All payments made in cash are final and non-refundable under any circumstances.</p>\n<h2 id=\"4-membership-terms\">4. MEMBERSHIP TERMS</h2>\n<h3>4.1 Cancellation Policy</h3>\n<p>Memberships may be cancelled at any time after the initial three (3) month commitment period. Cancellations must be submitted in writing (email or in person) and will take effect at the end of the current billing cycle.</p>\n<h3>4.2 Membership Pause/Hold</h3>\n<p>Clients may pause or place their membership on hold for a period of thirty (30) days at any time during their membership. This option is available once per membership and can be activated by providing written notice.</p>\n<h3>4.3 Hold Limitations</h3>\n<p>Each membership is entitled to one (1) thirty-day hold period only. Additional holds are not permitted.</p>\n<h2 id=\"5-general-terms\">5. GENERAL TERMS</h2>\n<h3>5.1 Notification Requirements</h3>\n<p>All cancellations, holds, and refund requests must be submitted in writing via email to [email address] or in person at our studio.</p>\n<h3>5.2 Processing Time</h3>\n<p>Approved refunds will be processed within seven (7) business days and will be credited to the original payment method.</p>\n<h3>5.3 Policy Changes</h3>\n<p>StretchFLEX reserves the right to modify this refund and cancellation policy at any time. Clients will be notified of any changes, and the updated policy will be posted on our website and displayed at our studio.</p>\n<h2 id=\"6-contact-information\">6. CONTACT INFORMATION</h2>\n<p>For questions regarding this policy or to request a cancellation or refund, please contact:</p>\n<p><strong>StretchFLEX</strong><br>Address: 111 Trinity Arcade, 72 St Georges Terrace, Perth CBD, WA 6000<br>Phone: <a href=\"tel:0432569077\">0432 569 077</a><br>Email Address: <a href=\"mailto:alan@stretchflex.au\">alan@stretchflex.au</a></p>\n<p>By scheduling an appointment, purchasing a package, or enrolling in a membership at StretchFLEX, you acknowledge that you have read, understood, and agree to abide by this Refund and Cancellation Policy.</p>";

export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      kicker: "Effective Date: 30 January 2026",
      title: "Refund and Cancellation",
      accent: "Policy",
      intro:
        "At StretchFLEX, we are committed to providing exceptional assisted stretch and wellness services while maintaining fair and transparent policies for all our clients. Please review our refund and cancellation policy carefully.",
      image: {
        src: "/wp-content/uploads/2026/02/openart-image_lW2ChY4x_1770268860390_raw.webp",
        alt: "A client checking in with a StretchFLEX therapist at reception",
        position: "45% 45%",
      },
    },
    { type: "prose", html },
    { type: "contact" },
  ],
};

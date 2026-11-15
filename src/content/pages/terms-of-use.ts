import type { PageContent } from "./types";

/** /terms-of-use: the terms from the client's content document, word for word. */
const html = `
<h2>1. General information only</h2>
<p>Content on this website is general information about our services. It is not medical advice and does not take your personal circumstances into account. Always speak to your doctor or another qualified health professional about injuries, medical conditions or treatment.</p>

<h2>2. Our services</h2>
<p>Our services support general mobility, recovery and wellbeing. They do not diagnose, treat or cure any medical condition. Results vary from person to person.</p>

<h2>3. Reviews and testimonials</h2>
<p>Reviews on this website are from real clients and reflect their individual experiences. They are not a guarantee of the results you will get.</p>

<h2>4. Prices and availability</h2>
<p>All prices are in Australian dollars and include GST. We may change prices, sessions and offers at any time, but changes do not affect bookings, packs or memberships you have already paid for. Bookings are subject to availability.</p>

<h2>5. Bookings and payments</h2>
<p>Online bookings and payments are made through third-party providers and are also subject to their terms. Our <a href="/refund-and-cancellation-policy">Refund and Cancellation Policy</a> and <a href="/membership-terms">Membership Terms and Conditions</a> apply to all purchases.</p>

<h2>6. Intellectual property</h2>
<p>The content, logos, images and names on this website, including StretchFLEX and Photobiotic Assisted Stretching™, belong to us or are used with permission. You may not copy or reuse them without our written consent.</p>

<h2>7. Links to other websites</h2>
<p>This website may link to other websites. We are not responsible for their content or practices.</p>

<h2>8. Liability</h2>
<p>To the extent permitted by law, we are not liable for any loss arising from your use of this website. Nothing in these terms excludes, restricts or modifies your rights under the Australian Consumer Law.</p>

<h2>9. Privacy</h2>
<p>Our <a href="/privacy-policy">Privacy Policy</a> explains how we handle your personal information.</p>

<h2>10. Governing law</h2>
<p>These terms are governed by the laws of Western Australia.</p>

<h2>11. Contact us</h2>
<p>StretchFLEX, 111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000 · <a href="tel:0432569077">0432 569 077</a> · <a href="mailto:info@stretchflex.au">info@stretchflex.au</a></p>
`;

export const page: PageContent = {
  seo: {
    title: "Website Terms of Use | StretchFLEX",
    description:
      "The terms that apply when you use the StretchFLEX website, including health information, pricing and intellectual property.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Policies and terms",
      title: "Website Terms of Use",
      intro: [
        "Last updated: 14 November 2026",
        'This website is operated by Wellbeing Beyond Wellness Pty Ltd, ABN 42 687 612 611, trading as StretchFLEX ("we", "us"). By using this website, you agree to these terms.',
      ],
    },
    { type: "prose", html },
  ],
};

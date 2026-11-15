import type { PageContent } from "./types";

/** /privacy-policy: the policy from the client's content document, word for word. */
const html = `
<h2>1. What we collect</h2>
<ul>
  <li>Contact details: your name, email address, phone number and date of birth.</li>
  <li>Health information: your health history, injuries, medications and conditions relevant to your sessions, and notes your therapist makes about your sessions.</li>
  <li>Booking and payment details: your appointments, packs and memberships. Card and bank details are processed by our payment providers and are not stored by us.</li>
  <li>Website and marketing information: how you use our website, collected through cookies and tools such as Google Analytics and the Meta Pixel.</li>
  <li>Communications: messages, enquiries and feedback you send us.</li>
</ul>

<h2>2. How we collect it</h2>
<p>We collect information directly from you when you book, complete a health questionnaire, buy a pack or membership, contact us or visit our website. We collect health information only with your consent.</p>

<h2>3. Why we use it</h2>
<ul>
  <li>To provide safe sessions suited to your health and goals</li>
  <li>To manage bookings, payments, packs and memberships</li>
  <li>To contact you about your appointments and account</li>
  <li>To send you news and offers, if you have agreed. You can unsubscribe at any time.</li>
  <li>To improve our services and website</li>
  <li>To meet our legal obligations</li>
</ul>

<h2>4. Who we share it with</h2>
<p>We do not sell your personal information. We share it only where needed to run our business, including with:</p>
<ul>
  <li>our booking, scheduling and email systems</li>
  <li>payment and direct debit providers</li>
  <li>website, analytics and advertising providers such as Google and Meta</li>
  <li>our IT providers and professional advisers</li>
  <li>anyone else you ask us to share it with, or where the law requires us to</li>
</ul>
<p>Some of these providers store information outside Australia, including in the United States. We take reasonable steps to make sure they protect your information.</p>

<h2>5. Health information</h2>
<p>Your health information is used only to provide safe and suitable sessions. It is seen only by the StretchFLEX team members who need it, and is never used for marketing.</p>

<h2>6. Keeping it secure</h2>
<p>We store your information securely and limit access to people who need it. We keep client records for as long as needed to provide our services and meet legal requirements, then securely delete or de-identify them.</p>

<h2>7. Cookies and advertising</h2>
<p>Our website uses cookies and similar tools to understand how visitors use the site and to show relevant advertising on other platforms. You can turn off cookies in your browser settings, and manage ad preferences in your Google and Meta account settings.</p>

<h2>8. Accessing and correcting your information</h2>
<p>You can ask to see or correct the information we hold about you at any time by contacting us. We will respond within 30 days.</p>

<h2>9. Complaints</h2>
<p>If you have a concern about how we have handled your information, please contact us first and we will respond within 30 days. If you are not satisfied, you can contact the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">oaic.gov.au</a>.</p>

<h2>10. Contact us</h2>
<p>Privacy Officer, StretchFLEX, 111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000 · <a href="tel:0432569077">0432 569 077</a> · <a href="mailto:info@stretchflex.au">info@stretchflex.au</a></p>
`;

export const page: PageContent = {
  seo: {
    title: "Privacy Policy | StretchFLEX",
    description:
      "How StretchFLEX collects, uses, stores and protects your personal and health information, and how to access or correct it.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Policies and terms",
      title: "Privacy Policy",
      intro: [
        "Last updated: 14 November 2026",
        'StretchFLEX is operated by Wellbeing Beyond Wellness Pty Ltd, ABN 42 687 612 611 ("we", "us"). We respect your privacy and handle your personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
      ],
    },
    { type: "prose", html },
  ],
};

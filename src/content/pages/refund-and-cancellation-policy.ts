import type { PageContent } from "./types";

/** /refund-and-cancellation-policy: the policy from the client's content document, word for word. */
const html = `
<h2>1. Your rights under Australian Consumer Law</h2>
<p>Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in this policy limits those rights. If a service is not provided with due care and skill, or is not fit for the purpose we told you it would achieve, you may be entitled to a remedy, including a refund.</p>

<h2>2. Cancelling or rescheduling an appointment</h2>
<div class="tbl" role="region" aria-label="Cancellation notice and outcome" tabindex="0">
<table style="display: table">
  <thead><tr><th scope="col">Notice given</th><th scope="col">Outcome</th></tr></thead>
  <tbody>
    <tr><td data-label="Notice given">48 hours or more</td><td data-label="Outcome">Free reschedule or full refund</td></tr>
    <tr><td data-label="Notice given">24 to 48 hours</td><td data-label="Outcome">Free reschedule or 50% refund</td></tr>
    <tr><td data-label="Notice given">Less than 24 hours</td><td data-label="Outcome">No refund. The session is charged in full</td></tr>
    <tr><td data-label="Notice given">No-show</td><td data-label="Outcome">No refund. The session is charged in full</td></tr>
  </tbody>
</table>
</div>
<p>You can cancel or reschedule online, by phone on <a href="tel:0432569077">0432 569 077</a> or by email.</p>

<h2>3. Late arrival</h2>
<p>If you arrive late, we will do our best to give you your full session, but it may need to finish at the scheduled time so the next client is not delayed. The full session price applies.</p>

<h2>4. Session packs</h2>
<ul>
  <li>Packs are valid for 12 months from the date of purchase. Unused sessions expire after that date.</li>
  <li>Packs are for one person and cannot be transferred or shared.</li>
  <li>Packs are non-refundable once purchased, except as required by the Australian Consumer Law or where we are unable to provide the sessions.</li>
  <li>Sessions booked from a pack follow the cancellation rules above. A session cancelled with less than 24 hours notice, or missed, is deducted from your pack.</li>
</ul>

<h2>5. Memberships</h2>
<ul>
  <li>Assisted Stretching Memberships (Revive, Prime and Ultimate) have a minimum commitment of three months (13 weekly payments). Performance &amp; Recovery Memberships (Bronze, Silver and Gold) have a minimum commitment of four weeks.</li>
  <li>Memberships are billed weekly by direct debit and continue week to week after the minimum term until cancelled.</li>
  <li>Membership sessions are allocated weekly and do not carry over to the following week.</li>
  <li>Membership sessions cancelled with less than 24 hours notice, and missed appointments, are forfeited.</li>
  <li>You may cancel at any time after your minimum commitment by giving written notice. Cancellation takes effect at the end of the current weekly billing cycle.</li>
  <li>Each membership includes one 30-day hold, requested in writing.</li>
  <li>Full details are in our <a href="/membership-terms">Membership Terms and Conditions</a>.</li>
</ul>

<h2>6. If we need to cancel</h2>
<p>If we need to cancel or reschedule your appointment, we will contact you as soon as possible and offer a new time or a full refund, including for sessions booked from a pack or membership.</p>

<h2>7. How to request a cancellation, hold or refund</h2>
<p>All membership cancellations, holds and refund requests must be made in writing, by email to <a href="mailto:info@stretchflex.au">info@stretchflex.au</a> or in person at the studio.</p>

<h2>8. How refunds are paid</h2>
<p>Approved refunds are processed within 7 business days to your original payment method. Refunds for cash payments are made by bank transfer.</p>

<h2>9. Changes to this policy</h2>
<p>We may update this policy from time to time. The current version is always published on our website and available at the studio. Changes do not affect bookings, packs or memberships already purchased unless required by law.</p>

<h2>10. Contact us</h2>
<p>StretchFLEX, 111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000 · <a href="tel:0432569077">0432 569 077</a> · <a href="mailto:info@stretchflex.au">info@stretchflex.au</a></p>
`;

export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      kicker: "Policies and terms",
      title: "Refund and Cancellation Policy",
      intro: [
        "Last updated: 14 November 2026",
        'This policy explains how cancellations, rescheduling and refunds work for appointments, session packs and memberships at StretchFLEX. StretchFLEX is operated by Wellbeing Beyond Wellness Pty Ltd, ABN 42 687 612 611 ("we", "us").',
      ],
    },
    { type: "prose", html },
  ],
};

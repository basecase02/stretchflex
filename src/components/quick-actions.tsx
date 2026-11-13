import { CalendarIcon, PhoneIcon } from "@/components/icons";
import { BOOK_URL, PHONE } from "@/content/site";

/**
 * The two things people come to do, always one tap away in the bottom-right
 * corner: call the studio, or book a session. On service pages the booking
 * bar takes over while it is showing (see blocks.css), so they never stack.
 */
export function QuickActions() {
  return (
    <div className="quick" role="group" aria-label="Book or call">
      <a className="quick__call" href={PHONE.href} aria-label={`Call StretchFLEX on ${PHONE.label}`}>
        <PhoneIcon />
      </a>
      <a className="quick__book" href={BOOK_URL}>
        <CalendarIcon />
        <span>Book</span>
      </a>
    </div>
  );
}

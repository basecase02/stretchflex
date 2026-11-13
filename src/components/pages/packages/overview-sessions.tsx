import { Marquee } from "@/components/marquee";
import { SessionTabs, type SessionGroupView } from "@/components/session-tabs";
import { SessionFinder } from "@/components/session-finder";
import { SESSION_GROUPS, SESSIONS, SESSIONS_TITLE, type Session } from "@/content/site";

/**
 * The homepage's sessions carousel ("All" + filters, arrows), filled with the
 * packages overview page's own card text: its prices ("$65.00"), its session
 * labels ("30 minute session"), its lists and only its "Learn More" buttons.
 */
export function OverviewSessions({ sessions }: { sessions: (Session & { group: string })[] }) {
  const groups: SessionGroupView[] = SESSION_GROUPS.map((group) => ({
    id: group.id,
    tab: group.tab,
    title: group.title,
    sessions: sessions.filter((session) => session.group === group.id),
  }));
  return (
    <section className="sessions panel on-dark" id="packages">
      <Marquee as="p" className="sessions__title display">
        {SESSIONS_TITLE}
      </Marquee>
      <div className="wrap">
        <SessionTabs groups={groups} />
        {/* The finder books straight from SESSIONS (these cards only link to "Learn More"). */}
        <SessionFinder
          sessions={SESSIONS.map(({ id, name, duration, price, lead, learnHref, bookHref }) => ({ id, name, duration, price, lead, learnHref, bookHref }))}
        />
      </div>
    </section>
  );
}

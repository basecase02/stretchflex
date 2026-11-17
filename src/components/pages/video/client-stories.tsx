import { CLIENT_VIDEOS } from "@/content/site";
import { Shorts } from "./shorts";

/** "Client stories": the testimonial videos beside a short introduction. */
export function ClientStories({ id }: { id?: string }) {
  return (
    <Shorts
      id={id}
      tone="blue"
      kicker="Client stories"
      title="Real people. Real results."
      handWord="results."
      lead="Hear it from the clients who stretch with us every week."
      story={{ rating: "Rated 5.0 by our clients on Google" }}
      items={CLIENT_VIDEOS}
    />
  );
}

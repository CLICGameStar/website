import { getTranslation } from "@/locales";
import { GameStarEvent } from "@/types/aliases";
import Link from "next/link";

export default function EventCard({
  event,
  lang,
}: {
  event: GameStarEvent;
  lang: string;
}) {
  const translation = getTranslation(event, lang);
  let start_date = new Date(event.start).toLocaleDateString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div key={event.slug} className="event-card">
      <Link href={`${lang}/events/${event.slug}`}>
        <div className="event-head">
          <h3>{translation.title}</h3>
          <div className="event-start">{start_date}</div>
        </div>

        <p>{translation.description}</p>
      </Link>
    </div>
  );
}

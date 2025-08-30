import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { readItems, readSingleton } from "@directus/sdk";
import { GameStarEvent } from "@/types/aliases";
import { get } from "http";
import Link from "next/link";
import EventCard from "@/components/EventCard";

export default async function Events({ params }: { params: { lang: string } }) {
  const { lang } = await params;

  let events = (await directus().request(
    //@ts-ignore
    readItems("game_star_events", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarEvent[];

  return (
    <div className="content">
      <h1>Events</h1>
      <div className="events-list">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} lang={lang} />
        ))}
      </div>
      {events.length === 0 ? <p>Coming soon !</p> : null}
    </div>
  );
}

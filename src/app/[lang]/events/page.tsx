import { directus } from "@/directus";
import {
  capitalize,
  getTranslation,
  queryTranslations,
  useTranslationTable,
} from "@/locales";
import { readItems, readSingleton } from "@directus/sdk";
import { GameStarEvent } from "@/types/aliases";
import { get } from "http";
import Link from "next/link";
import EventCard from "@/components/EventCard";

export default async function Events({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const tt = useTranslationTable();

  let events = (await directus().request(
    //@ts-ignore
    readItems("game_star_events", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarEvent[];

  return (
    <div className="content">
      <h1>{capitalize(tt["event"])}s</h1>
      <div className="events-list">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} lang={lang} />
        ))}
      </div>
      {events.length === 0 ? <p>{tt["gamestar.comingSoon"]} !</p> : null}
    </div>
  );
}

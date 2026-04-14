import { directus } from "@/directus";
import { capitalize, queryTranslations, useTranslationTable } from "@/locales";
import { readItems } from "@directus/sdk";
import { GameStarEvent } from "@/types/aliases";
import EventCard from "@/components/EventCard";

export default async function Events({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  let events = (await directus().request(
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

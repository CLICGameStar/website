import { directus } from "@/directus";
import { capitalize, queryTranslations, useTranslationTable } from "@/locales";
import { readItems } from "@directus/sdk";
import { GameStarEvent } from "@/types/aliases";
import { EventCard } from "@/components/Cards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  return {
    title: `${capitalize(tt["event"])}s | Game*`,
  };
}

export default async function Events({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  let events = (await directus().request(
    readItems("game_star_events", {
      filter: { published: { _eq: true } },
      ...queryTranslations,
    }),
  )) as GameStarEvent[];

  const sortedEvents = events.map((event) => ({
    ...event,
    startDate: new Date(event.start!),
  }));
  sortedEvents.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  return (
    <div className="content">
      <h1>{capitalize(tt["event"])}s</h1>
      <div className="cards-list">
        {sortedEvents.map((event) => (
          <EventCard key={event.slug} event={event} lang={lang} />
        ))}
      </div>
      {events.length === 0 ? <p>{tt["gamestar.comingSoon"]} !</p> : null}
    </div>
  );
}

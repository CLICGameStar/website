import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { GameStarEvent } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

async function getEvent(event_slug: string): Promise<GameStarEvent> {
  const events = (await directus().request(
    readItems("game_star_events", {
      filter: { status: { _eq: "published" }, slug: { _eq: event_slug } },
      limit: 1,
      ...queryTranslations,
    }),
  )) as GameStarEvent[];

  const event = events[0] ?? null;

  if (!event) {
    notFound();
  }

  return event;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ event: string; lang: string }>;
}) {
  const { event: event_slug, lang } = await params;

  const translation = getTranslation(await getEvent(event_slug), lang);

  return {
    title: translation.title,
    description: translation.description,
  };
}

export default async function Event({
  params,
}: {
  params: Promise<{ event: string; lang: string }>;
}) {
  const { event: event_slug, lang } = await params;
  const translation = getTranslation(await getEvent(event_slug), lang);

  return (
    <div className="article">
      <h1>{translation.title}</h1>
      <Markdown>{translation.content}</Markdown>
    </div>
  );
}

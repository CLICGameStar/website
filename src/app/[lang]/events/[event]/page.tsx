import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { GameStarEvent } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Event({
  params,
}: {
  params: { event: string; lang: string };
}) {
  const { lang } = await params;
  const events = (await directus().request(
    //@ts-ignore
    readItems("game_star_events", {
      filter: { status: { _eq: "published" }, slug: { _eq: params.event } },
      limit: 1,
      ...queryTranslations,
    }),
  )) as GameStarEvent[];

  const event = events[0] ?? null;

  if (!event) {
    notFound();
  }

  const translation = getTranslation(event, lang);

  return (
    <div className="article">
      <h1>{translation.title}</h1>
      <Markdown>{translation.content}</Markdown>
    </div>
  );
}

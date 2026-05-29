import GameEmbed from "@/components/GameEmbed";
import { directus } from "@/directus";
import { capitalize, getTranslation, queryTranslations } from "@/locales";
import { GameStarGame } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

async function getGame(game_slug: string): Promise<GameStarGame> {
  const games = (await directus().request(
    readItems("game_star_games", {
      filter: { slug: { _eq: game_slug } },
      limit: 1,
      ...queryTranslations,
    }),
  )) as GameStarGame[];

  const project = games[0] ?? null;

  if (!project) {
    notFound();
  }

  return project;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; lang: string }>;
}) {
  const { game: game_slug, lang } = await params;

  const gameData = await getGame(game_slug);
  const translation = getTranslation(gameData, lang);

  return {
    title: gameData.name,
    description: translation.description,
  };
}

export default async function Game({
  params,
}: {
  params: Promise<{ game: string; lang: string }>;
}) {
  const { game: game_slug, lang } = await params;
  const gameData = await getGame(game_slug);
  const translation = getTranslation(gameData, lang);

  return (
    <div className="content">
      <h1>{capitalize(gameData.name)}</h1>
      <GameEmbed game={gameData} />
      <Markdown>{translation.content}</Markdown>
    </div>
  );
}

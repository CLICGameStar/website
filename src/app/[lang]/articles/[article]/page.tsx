import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { GameStarArticle } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Article({
  params,
}: {
  params: Promise<{ article: string; lang: string }>;
}) {
  const { article: article_slug, lang } = await params;
  const articles = (await directus().request(
    readItems("game_star_articles", {
      filter: { status: { _eq: "published" }, slug: { _eq: article_slug } },
      limit: 1,
      ...queryTranslations,
    }),
  )) as GameStarArticle[];

  const article = articles[0] ?? null;

  if (!article) {
    notFound();
  }

  const translation = getTranslation(article, lang);

  return (
    <div className="article">
      <h1>{translation.title}</h1>
      <Markdown>{translation.content}</Markdown>
    </div>
  );
}

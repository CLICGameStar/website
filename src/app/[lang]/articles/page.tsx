import { directus } from "@/directus";
import {
  capitalize,
  getTranslation,
  queryTranslations,
  useTranslationTable,
} from "@/locales";
import { readItems, readSingleton } from "@directus/sdk";
import { GameStarArticle } from "@/types/aliases";
import { get } from "http";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";

export default async function Articles({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  let articles = (await directus().request(
    readItems("game_star_articles", {
      filter: { status: { _eq: "published" } },
      fields: ["*", { translations: ["*"], authors: [{ members_id: ["*"] }] }],
    }),
  )) as GameStarArticle[];

  return (
    <div className="content">
      <h1>{capitalize(tt["article"])}s</h1>
      <div className="cards-list">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} lang={lang} />
        ))}
      </div>
      {articles.length === 0 ? <p>{tt["gamestar.comingSoon"]} !</p> : null}
    </div>
  );
}

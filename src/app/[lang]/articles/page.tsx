import { directus } from "@/directus";
import {
  capitalize,
  getTranslation,
  queryTranslations,
  useTranslationTable,
} from "@/locales";
import { readItems } from "@directus/sdk";
import { GameStarArticle } from "@/types/aliases";
import Link from "next/link";

export default async function Articles({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  let articles = (await directus().request(
    readItems("game_star_articles", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarArticle[];

  return (
    <div className="content">
      <h1>{capitalize(tt["article"])}s</h1>
      {articles.map((article) => (
        <div key={article.slug}>
          <h2>
            <Link href={`/${lang}/articles/${article.slug}`}>
              {getTranslation(article, lang).title}
            </Link>
          </h2>
          <p>{getTranslation(article, lang).description}</p>
        </div>
      ))}
      {articles.length === 0 ? <p>{tt["gamestar.comingSoon"]} !</p> : null}
    </div>
  );
}

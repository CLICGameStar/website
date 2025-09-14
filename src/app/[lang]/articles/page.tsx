import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { readItems, readSingleton } from "@directus/sdk";
import { GameStarArticle } from "@/types/aliases";
import { get } from "http";
import Link from "next/link";

export default async function Articles({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  let articles = (await directus().request(
    //@ts-ignore
    readItems("game_star_articles", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarArticle[];

  return (
    <div className="content">
      <h1>Articles</h1>
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
      {articles.length === 0 ? <p>Coming soon !</p> : null}
    </div>
  );
}

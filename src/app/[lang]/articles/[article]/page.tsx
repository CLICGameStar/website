import PeopleBar from "@/components/PeopleBar";
import { directus } from "@/directus";
import { getTranslation, useTranslationTable } from "@/locales";
import {
  GameStarArticle,
  GameStarArticleMember,
  Member,
} from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Article({
  params,
}: {
  params: Promise<{ article: string; lang: string }>;
}) {
  const { article: article_slug, lang } = await params;
  const tt = await useTranslationTable(lang);
  const articles = (await directus().request(
    readItems("game_star_articles", {
      fields: ["*", { translations: ["*"], authors: [{ members_id: ["*"] }] }],
      filter: { status: { _eq: "published" }, slug: { _eq: article_slug } },
      limit: 1,
    }),
  )) as GameStarArticle[];

  const article = articles[0] ?? null;

  if (!article) {
    notFound();
  }

  const translation = getTranslation(article, lang);

  return (
    <>
      <div className="article">
        <h1>{translation.title}</h1>
        <Markdown>{translation.content}</Markdown>
      </div>
      {article.authors?.length === 0 ? null : (
        <PeopleBar
          people={(article.authors as GameStarArticleMember[])?.map(
            (author) => {
              return {
                name: (author.members_id as Member).name as string,
                surname: (author.members_id as Member).surname as string,
                role: tt["author"],
                link: (author.members_id as Member).link as string,
                image: (author.members_id as Member).picture as string,
              };
            },
          )}
        />
      )}
    </>
  );
}

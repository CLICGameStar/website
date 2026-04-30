import { getTranslation, useTranslationTable } from "@/locales";
import {
  GameStarArticle,
  GameStarArticleMember,
  Member,
} from "@/types/aliases";
import Link from "next/link";

export default async function ArticleCard({
  article,
  lang,
}: {
  article: GameStarArticle;
  lang: string;
}) {
  const tt = await useTranslationTable(lang);

  const translation = getTranslation(article, lang);

  let names = (article.authors as GameStarArticleMember[])?.map(
    (author) =>
      (author.members_id as Member).name +
      " " +
      (author.members_id as Member).surname,
  );

  let start = names.slice(0, -1).join(", ");
  let last = names[names.length - 1];

  let res = start === "" ? ` ${last}` : ` ${start} ${tt["and"]} ${last}`;

  return (
    <div key={article.slug} className="card">
      <Link href={`/${lang}/articles/${article.slug}`}>
        <div className="card-head">
          <h3>{translation.title}</h3>
          <div className="authors">
            {article.authors?.length === 0 ? tt["anonymous"] : tt["by"] + res}
          </div>
        </div>
        <p>{translation.description}</p>
      </Link>
    </div>
  );
}

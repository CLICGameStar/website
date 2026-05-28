import { getTranslation, useTranslationTable } from "@/locales";
import {
  GameStarArticle,
  GameStarArticleMember,
  GameStarEvent,
  GameStarGame,
  GameStarProject,
  Member,
} from "@/types/aliases";
import Link from "next/link";
import DirectusImage from "./DirectusImage";

export async function ProjectCard({
  project,
  lang,
}: {
  project: GameStarProject;
  lang: string;
}) {
  const tt = await useTranslationTable(lang);

  const translation = getTranslation(project, lang);

  return (
    <div key={project.slug} className="card">
      <Link href={`/${lang}/projects/${project.slug}`}>
        <div className="card-head">
          <h3>{translation.title}</h3>
        </div>
        <p>{translation.description}</p>
      </Link>
    </div>
  );
}

export function EventCard({
  event,
  lang,
}: {
  event: GameStarEvent;
  lang: string;
}) {
  const translation = getTranslation(event, lang);
  let start_date = new Date(event.start!).toLocaleDateString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div key={event.slug} className="card">
      <Link href={`/${lang}/events/${event.slug}`}>
        <div className="card-head">
          <h3>{translation.title}</h3>
          <div className="event-start">{start_date}</div>
        </div>

        <p>{translation.description}</p>
      </Link>
    </div>
  );
}

export async function GameCard({
  game,
  lang,
}: {
  game: GameStarGame;
  lang: string;
}) {
  const tt = await useTranslationTable(lang);

  const translation = getTranslation(game, lang);

  return (
    <div key={game.slug} className="card">
      <Link href={`/${lang}/games/${game.slug}`}>
        <div className="card-head">
          <h3>{game.name}</h3>
        </div>
        <p>{translation.description}</p>
      </Link>
    </div>
  );
}

export async function ArticleCard({
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

export function ComiteeCard({
  name,
  surname,
  role,
  link,
  image,
}: {
  name: string;
  surname: string;
  role: string;
  link: string;
  image: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="comitee-card-link"
    >
      <div className="comitee-card">
        <DirectusImage
          cover={true}
          img={image}
          name={name}
          className={"comitee-card-image"}
          sizes="512px"
        />
        <div>
          <h3>
            {name} {surname}
          </h3>
          <p>{role}</p>
        </div>
      </div>
    </a>
  );
}

import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { readItems, readSingleton } from "@directus/sdk";
import { GameStarProject } from "../../../directus-config/types/aliases";
import { get } from "http";
import Link from "next/link";

export default async function Projects({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;

  let projects = (await directus().request(
    //@ts-ignore
    readItems("game_star_projects", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarProject[];

  return (
    <div className="content">
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project.slug}>
          <h2>
            <Link href={`/projects/${project.slug}`}>
              {getTranslation(project, lang).title}
            </Link>
          </h2>
          <p>{getTranslation(project, lang).description}</p>
        </div>
      ))}
      {projects.length === 0 ? <p>Coming soon !</p> : null}
    </div>
  );
}

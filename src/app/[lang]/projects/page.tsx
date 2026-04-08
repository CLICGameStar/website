import { directus } from "@/directus";
import {
  capitalize,
  queryTranslations,
  useTranslationTable,
} from "@/locales";
import { readItems } from "@directus/sdk";
import { GameStarProject } from "@/types/aliases";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  let projects = (await directus().request(
    //@ts-ignore
    readItems("game_star_projects", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarProject[];

  return (
    <div className="content">
      <h1>{capitalize(tt["project"])}s</h1>
      <div className="cards-list">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} lang={lang} />
              ))}
            </div>
      {projects.length === 0 ? <p>{tt["gamestar.comingSoon"]} !</p> : null}
    </div>
  );
}

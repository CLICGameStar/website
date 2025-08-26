import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { GameStarProject } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Project({
  params,
}: {
  params: { project: string; lang: string };
}) {
  const { lang } = await params;
  const projects = (await directus().request(
    //@ts-ignore
    readItems("game_star_projects", {
      filter: { status: { _eq: "published" }, slug: { _eq: params.project } },
      limit: 1,
      ...queryTranslations,
    }),
  )) as GameStarProject[];

  const project = projects[0] ?? null;

  if (!project) {
    notFound();
  }

  const translation = getTranslation(project, lang);

  return (
    <div className="article">
      <h1>{translation.title}</h1>
      <Markdown>{translation.content}</Markdown>
    </div>
  );
}

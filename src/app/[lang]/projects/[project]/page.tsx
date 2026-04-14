import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { GameStarProject } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Project({
  params,
}: {
  params: Promise<{ project: string; lang: string }>;
}) {
  const { project: project_slug, lang } = await params;
  const projects = (await directus().request(
    readItems("game_star_projects", {
      filter: { status: { _eq: "published" }, slug: { _eq: project_slug } },
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

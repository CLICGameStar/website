import { directus } from "@/directus";
import { getTranslation, queryTranslations } from "@/locales";
import { GameStarProject } from "@/types/aliases";
import { readItems } from "@directus/sdk";
import { notFound, redirect } from "next/navigation";
import Markdown from "react-markdown";

async function getProject(project_slug: string): Promise<GameStarProject> {
  const projects = (await directus().request(
    readItems("game_star_projects", {
      filter: { slug: { _eq: project_slug } },
      limit: 1,
      ...queryTranslations,
    }),
  )) as GameStarProject[];

  const project = projects[0] ?? null;

  if (!project) {
    notFound();
  }

  return project;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string; lang: string }>;
}) {
  const { project: project_slug, lang } = await params;
  const translation = getTranslation(await getProject(project_slug), lang);

  return {
    title: translation.title,
    description: translation.description,
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ project: string; lang: string }>;
}) {
  const { project: project_slug, lang } = await params;
  const project = await getProject(project_slug);

  if (project.redirection) redirect(project.redirection);

  const translation = getTranslation(project, lang);

  return (
    <div className="article">
      <h1>{translation.title}</h1>
      <Markdown>{translation.content}</Markdown>
    </div>
  );
}

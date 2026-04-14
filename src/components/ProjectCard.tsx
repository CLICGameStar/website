import { getTranslation, useTranslationTable } from "@/locales";
import { GameStarProject } from "@/types/aliases";
import Link from "next/link";

export default async function ProjectCard({
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

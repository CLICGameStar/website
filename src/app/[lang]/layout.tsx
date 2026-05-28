import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { directus } from "@/directus";
import {
  capitalize,
  getTranslation,
  queryTranslations,
  useTranslationTable,
} from "@/locales";
import "@/styles/style.scss";
import { GameStar } from "@/types/aliases";
import { readItems, readSingleton } from "@directus/sdk";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const game_star = (await directus().request(
    readSingleton("game_star", {
      ...queryTranslations,
    }),
  )) as GameStar;
  const game_star_translation = getTranslation(game_star, lang);

  return {
    title: "Game*",
    description: game_star_translation.about_text,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  const social_links: { social_type: string; social_link: string }[] =
    (await directus().request(
      // fetch social links from directus
      readItems("game_star_social_links", {
        fields: ["social_type", "social_link", "social_account"],
      }),
    )) as { social_type: string; social_link: string }[];

  return (
    <html lang={lang}>
      <body>
        <Navigation
          navLinks={[
            { name: capitalize(tt["home"]), href: `/${lang}` },
            { name: capitalize(tt["event"]) + "s", href: `/${lang}/events` },
            {
              name: capitalize(tt["project"]) + "s",
              href: `/${lang}/projects`,
            },
            {
              name: capitalize(tt["article"]) + "s",
              href: `/${lang}/articles`,
            },
            { name: capitalize(tt["games"]), href: `/${lang}/games` },
          ]}
        />
        <main>{children}</main>
        <Footer socialLinks={social_links} />
      </body>
    </html>
  );
}

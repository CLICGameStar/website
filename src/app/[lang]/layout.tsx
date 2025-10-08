import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { directus } from "@/directus";
import { capitalize, useTranslationTable } from "@/locales";
import "@/styles/style.scss";
import { readItems, readTranslations } from "@directus/sdk";
import { use } from "react";

export const metadata = {
  title: "Game*",
  description: "Game* is a student association at EPFL",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
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
            { name: capitalize(tt["home"]), href: "/" },
            { name: capitalize(tt["event"]) + "s", href: "/events" },
            { name: capitalize(tt["project"]) + "s", href: "/projects" },
            { name: capitalize(tt["article"]) + "s", href: "/articles" },
          ]}
        />
        <main>{children}</main>
        <Footer socialLinks={social_links} />
      </body>
    </html>
  );
}

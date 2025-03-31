import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { directus } from "@/directus";
import "@/styles/style.scss";
import { readItems } from "@directus/sdk";

export const metadata = {
  title: "Game*",
  description: "Game* is a student association at EPFL",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const social_links: { social_type: string; social_link: string }[] =
    (await directus().request(
      // fetch social links from directus
      readItems("game_star_social_links", {
        fields: ["social_type", "social_link", "social_account"],
      }),
    )) as { social_type: string; social_link: string }[];

  return (
    <html lang="en">
      <body>
        <Navigation
          navLinks={[
            { name: "Home", href: "/" },
            { name: "Events", href: "/events" },
            { name: "Projects", href: "/projects" },
          ]}
        />
        {children}
        <Footer socialLinks={social_links} />
      </body>
    </html>
  );
}

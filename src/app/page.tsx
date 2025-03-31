import { directus } from "@/directus";
import { readSingleton } from "@directus/sdk";
import { getTranslation, queryTranslations } from "@/locales";
import DirectusImage from "@/components/DirectusImage";
import Navigation from "@/components/Navigation";

export default async function Home() {
  const association = await directus().request(
    readSingleton("association", {
      // @ts-expect-error
      fields: ["*", "translations.*", "translations.banner.*"],
    }),
  );
  const translations = getTranslation(association, "en");

  return (
    <main>
      <Navigation
        navLinks={[
          { name: "Home", href: "/" },
          { name: "Events", href: "/events" },
          { name: "Projects", href: "/projects" },
        ]}
      />
    </main>
  );
}

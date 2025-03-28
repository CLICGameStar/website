import { directus } from "@/directus";
import { readSingleton } from "@directus/sdk";
import { getTranslation, queryTranslations } from "@/locales";
import DirectusImage from "@/components/DirectusImage";

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
      <p></p>
      <div>
        <DirectusImage img={translations.banner} sizes="50rem" cover />
      </div>

      <pre>{translations.description}</pre>
    </main>
  );
}

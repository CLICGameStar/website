import { directus } from "@/directus";
import { readItem, readItems, readSingleton } from "@directus/sdk";
import { getTranslation, queryTranslations } from "@/locales";
import DirectusImage from "@/components/DirectusImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  AssociationMembership,
  GameStarSocialLink,
  Member,
  SocialLink,
} from "../../directus-config/types/aliases";
import ComiteeCard from "@/components/ComiteeCard";
import ComiteeBar from "@/components/ComiteeBar";

export default async function Home() {
  const association = await directus().request(
    readSingleton("association", {
      // @ts-expect-error
      fields: ["*", "translations.*", "translations.banner.*"],
    }),
  );

  let commissions = await directus().request(
    //@ts-ignore
    readItems("commissions", {
      filter: { slug: { _eq: "game-star" } },
      ...queryTranslations,
    }),
  );

  let commission = commissions[0];

  let comitees = (await directus().request(
    readItems("commission_memberships", {
      fields: [
        "*",
        { member: ["*"] },
        //@ts-ignore
        { translations: ["*"] },
      ],
      filter: {
        level: { _eq: "committee" },
        commission: { _eq: commission.id },
      },
    }),
  )) as (AssociationMembership & { member: Member })[];

  return (
    <main>
      <ComiteeBar
        comitees={comitees.map((comitee) => ({
          name: comitee.member.name as string,
          role: getTranslation(comitee, "en").title as string,
          link: comitee.member.link as string,
          image: comitee.member.picture as string,
        }))}
      />
    </main>
  );
}

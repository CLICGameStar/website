import { directus } from "@/directus";
import { readItem, readItems, readSingleton } from "@directus/sdk";
import { getTranslation, queryTranslations } from "@/locales";
import DirectusImage from "@/components/DirectusImage";
import {
  AssociationMembership,
  GameStarSocialLink,
  Member,
  SocialLink,
} from "../../../directus-config/types/aliases";
import ComiteeCard from "@/components/ComiteeCard";
import ComiteeBar from "@/components/ComiteeBar";
import { GameStar, GameStarEvent } from "@/types/aliases";
import Image from "next/image";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import ForwardArrowIcon from "@/components/icons/ForwardArrowIcon";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;

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

  const game_star = (await directus().request(
    //@ts-ignore
    readSingleton("game_star", {
      ...queryTranslations,
    }),
  )) as GameStar;

  const game_star_translation = getTranslation(game_star, lang);

  let events = (await directus().request(
    //@ts-ignore
    readItems("game_star_events", {
      filter: { status: { _eq: "published" } },
      ...queryTranslations,
    }),
  )) as GameStarEvent[];

  let upcomingEvents = getUpcomingEvents(events);

  return (
    <>
      <div className="hero">
        <picture>
          <source srcSet="/hero-mobile.svg" media="(max-width: 768px)" />
          <Image
            src="/hero.svg"
            alt="Hero image"
            width={1920}
            height={1080}
            priority
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </picture>
      </div>
      <div className="content">
        <h2>Upcoming events</h2>
        <div className="events-grid">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} lang={lang} />
          ))}
        </div>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events at the moment. Please check back later!</p>
        ) : null}
        <span className="boxlink">
          <ForwardArrowIcon />
          <Link href={`/${lang}/events`}>See all events</Link>
        </span>
        <h2>{game_star_translation.about_title}</h2>
        <p>{game_star_translation.about_text}</p>
        <h2>Committee</h2>
      </div>
      <ComiteeBar
        comitees={comitees.map((comitee) => {
          let role = getTranslation(comitee, lang).title as string;
          return {
            name: comitee.member.name as string,
            role: role,
            link: comitee.member.link as string,
            image: comitee.member.picture as string,
          };
        })}
      />
    </>
  );
}

export function getUpcomingEvents(events: GameStarEvent[]): GameStarEvent[] {
  const now = new Date();

  return events
    .map((event) => ({ ...event, startDate: new Date(event.start) }))
    .filter((event) => event.startDate > now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 3)
    .map(({ startDate, ...event }) => event);
}

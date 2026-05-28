"use client";

import { GameStarGame } from "@/types/aliases";
import { useEffect, useState } from "react";

export default function GameEmbed({ game }: { game: GameStarGame }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="game-embed">
      {isClient ? (
        <iframe
          src={`https://itch.io/embed-upload/${game.embed_id}?color=000000`}
          allowFullScreen={true}
          width="640"
          height="360"
        >
          <a href={game.href}>Play {game.name} on itch.io</a>
        </iframe>
      ) : null}
    </div>
  );
}

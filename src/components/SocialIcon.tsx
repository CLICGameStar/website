import DiscordIcon from "./icons/social_icons/DiscordIcon";
import EmailIcon from "./icons/social_icons/EmailIcon";
import GithubIcon from "./icons/social_icons/GithubIcon";
import InstagramIcon from "./icons/social_icons/InstagramIcon";
import LinkedinIcon from "./icons/social_icons/LinkedinIcon";
import LinktreeIcon from "./icons/social_icons/LinktreeIcon";
import TelegramIcon from "./icons/social_icons/TelegramIcon";
import TwitterIcon from "./icons/social_icons/TwitterIcon";
import YoutubeIcon from "./icons/social_icons/YoutubeIcon";

const socialIcons: Record<string, React.FC> = {
  telegram: TelegramIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  discord: DiscordIcon,
  email: EmailIcon,
  linktree: LinktreeIcon,
};

export default function SocialIcon({
  social_type,
  url,
}: {
  social_type: string;
  url: string;
}) {
  const Icon = socialIcons[social_type];

  if (!Icon) {
    console.error(`Unknown social type: ${social_type}`);
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="icon-link"
    >
      <Icon />
    </a>
  );
}

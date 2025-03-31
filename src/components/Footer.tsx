import SocialLinkBar from "./SocialLinkBar";

export default function Footer({
  socialLinks,
}: {
  socialLinks: {
    social_type: string;
    social_link: string;
  }[];
}) {
  return (
    <footer>
      <SocialLinkBar socialLinks={socialLinks} />
    </footer>
  );
}

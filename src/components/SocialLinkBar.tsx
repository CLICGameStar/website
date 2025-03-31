import SocialIcon from "./SocialIcon";

export default function SocialLinkBar({
  socialLinks,
}: {
  socialLinks: {
    social_type: string;
    social_link: string;
  }[];
}) {
  return (
    <div className="social-link-bar">
      {socialLinks.map((link) => (
        <SocialIcon
          key={link.social_link}
          social_type={link.social_type}
          url={link.social_link}
        />
      ))}
    </div>
  );
}

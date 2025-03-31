import Link from "next/link";

export default function NavMenu({
  isOpen,
  toggleMenu,
  navLinks,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
  navLinks: { name: string; href: string }[];
}) {
  return (
    <div className={`nav-menu ${isOpen ? "open" : ""}`}>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={toggleMenu}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

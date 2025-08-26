import Link from "next/link";
import { ReactElement } from "react";

export default function NavMenu({
  isOpen,
  toggleMenu,
  navLinks,
  languageDropdown,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
  navLinks: { name: string; href: string }[];
  languageDropdown: ReactElement;
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
        <li>{languageDropdown}</li>
      </ul>
    </div>
  );
}

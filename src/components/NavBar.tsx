import Link from "next/link";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import Logo from "../../public/gamestar-simple.svg";
import { ReactElement } from "react";

export default function NavBar({
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
  var MenuSwitchIcon = isOpen ? CloseIcon : MenuIcon;
  var alt = isOpen ? "Close" : "Menu";

  return (
    <header className="nav-bar">
      <a href="/" className="logo-link">
        <Logo className="logo" />
      </a>
      <nav className="nav-bar-links">
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
      </nav>
      <div className="nav-bar-right">
        <div onClick={toggleMenu}>
          <MenuSwitchIcon />
        </div>
      </div>
    </header>
  );
}

"use client";
import NavBar from "@components/NavBar";
import NavMenu from "@components/NavMenu";
import { useState } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import DropdownCard from "./Dropdown";
import LangIcon from "./icons/LangIcon";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/middleware";

export default function Navigation({
  navLinks,
}: {
  navLinks: {
    name: string;
    href: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  let toggleMenu = () => {
    if (isOpen) {
      enableBodyScroll(document.body);
    } else {
      disableBodyScroll(document.body);
    }
    setIsOpen(!isOpen);
  };

  let langOptions = [
    { value: "en", display: "English" },
    { value: "fr", display: "Français" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const switchLang = (lang: "en" | "fr") => {
    let pathParts = pathname.split("/");
    if (LOCALES.includes(pathParts[1])) {
      pathParts[1] = lang;
    } else {
      pathParts.splice(1, 0, lang);
    }
    let newPath = pathParts.join("/");
    router.push(newPath);
  };

  let languageDropdown = (
    <div className="lang-icon">
      <DropdownCard
        options={langOptions}
        dropdownState={{ value: "en", setValue: switchLang }}
        rightAlign={true}
      >
        <LangIcon />
      </DropdownCard>
    </div>
  );

  let langDrop2 = (
    <div className="lang-select">
      <div className="lang-icon">
        <LangIcon />
      </div>
      <div className="lang-select-options">
        {langOptions.map((e) => (
          <div className="lang-option" key={e.value} onClick={() => {}}>
            {e.display}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <NavBar
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        navLinks={navLinks}
        languageDropdown={languageDropdown}
      />
      <NavMenu
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        navLinks={navLinks}
        languageDropdown={langDrop2}
      />
    </>
  );
}

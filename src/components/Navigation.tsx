"use client";
import NavBar from "@components/NavBar";
import NavMenu from "@components/NavMenu";
import { useState } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

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
  return (
    <>
      <NavBar isOpen={isOpen} toggleMenu={toggleMenu} navLinks={navLinks} />
      <NavMenu isOpen={isOpen} toggleMenu={toggleMenu} navLinks={navLinks} />
    </>
  );
}

import React, { MutableRefObject, useEffect, useRef } from "react";

function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  handleClick: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClick]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({
  handleClickOutside,
  children,
}: {
  handleClickOutside: () => void;
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, handleClickOutside);

  return <div ref={wrapperRef}>{children}</div>;
}

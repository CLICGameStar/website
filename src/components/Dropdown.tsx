import { ElementType, useState } from "react";
import OutsideAlerter from "./OutsideAlerter";

export default function DropdownCard({
  options,
  dropdownState,
  children,
  rightAlign,
}: {
  options: { value: any; display: string }[];
  dropdownState: {
    value: any;
    setValue: (value: any) => void;
  };
  children: React.ReactNode;
  rightAlign?: boolean;
}) {
  const [stayOpen, setStayOpen] = useState(false);

  let option =
    dropdownState.value !== null
      ? options.find((o) => o.value === dropdownState.value)
      : null;

  return (
    <div className={`dropdown ${stayOpen ? "open" : ""}`}>
      <OutsideAlerter handleClickOutside={() => setStayOpen(false)}>
        <div onClick={() => setStayOpen(!stayOpen)}>{children}</div>
      </OutsideAlerter>
      <div className={`dropdown-content ${rightAlign ? "right-align" : ""}`}>
        {options.map((e) => (
          <div
            className="dropdown-item"
            key={e.value}
            onClick={() => {
              dropdownState.setValue(e.value);
              setStayOpen(false);
            }}
          >
            {e.display}
          </div>
        ))}
      </div>
    </div>
  );
}

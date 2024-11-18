import { ChangeEventHandler, FC } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import s from "./_internal/Dropdown.module.scss";
import { DropdownOption } from "./_internal/Dropdown.types";
import { getCurrentValue } from "./_internal/Dropdown.utils";

type IProps = {
  name: string;
  className?: string;
  options: DropdownOption[];
  placeholder?: string;
  selectedIndex: number | undefined;
  onChange: (newSelectedIndex: number) => void;
};

export const Dropdown: FC<IProps> = (props) => {
  const { className, name, options, placeholder, selectedIndex, onChange } = props;

  const currentValue = getCurrentValue({ placeholder, selectedIndex });

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={clsx(className, s["dropdown"], "relative", "flex")}>
      <select
        className={clsx(
          s["dropdown__select"],
          "px-1 py-2",
          "basis-full",
          "cursor-pointer appearance-none bg-transparent",
          "font-abhaya text-sm",
        )}
        id={name}
        onChange={handleChange}
        value={currentValue}
      >
        {placeholder !== undefined ? (
          <option disabled value=''>
            {placeholder}
          </option>
        ) : null}
        {options.map((option, idx) => (
          <option disabled={option.disabled} key={option.value} value={idx}>
            {option.display}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className={clsx("absolute bottom-0 right-1 top-0 m-auto", "h-4 w-4", "pointer-events-none")}
      />
    </div>
  );
};

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
  const { className, name, options, placeholder, selectedIndex, onChange } =
    props;

  const currentValue = getCurrentValue({ placeholder, selectedIndex });

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={clsx(className, s["dropdown"], "relative", "flex")}>
      <select
        value={currentValue}
        className={clsx(
          s["dropdown__select"],
          "px-1 py-2",
          "basis-full",
          "appearance-none bg-transparent cursor-pointer",
        )}
        id={name}
        onChange={handleChange}
      >
        {placeholder !== undefined ? (
          <option disabled value=''>
            {placeholder}
          </option>
        ) : null}
        {options.map((option, idx) => (
          <option key={option.value} value={idx} disabled={option.disabled}>
            {option.display}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className={clsx(
          "absolute top-0 bottom-0 right-1 m-auto",
          "w-4 h-4",
          "pointer-events-none",
        )}
      />
    </div>
  );
};

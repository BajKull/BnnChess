"use client";

import useOnClickOutside from "@/hooks/useOnClickOutside";
import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useRef, useState } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  value: string;
  setValue: (v: string) => void;
}
const SelectWithText = ({ options, value, setValue, ...props }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const clsDiv = classNames(
    "relative inline-block w-full text-left",
    props.className
  );

  useOnClickOutside(selectRef, () => setIsExpanded(false));

  const handleBtnClick = () => {
    setIsExpanded((s) => !s);
    if (!inputRef.current) return;
    (inputRef.current as HTMLElement).focus();
  };

  return (
    <div className={clsDiv} ref={selectRef} {...props}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700 focus:bg-zinc-700"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleBtnClick}
        >
          <input
            value={value}
            className="mr-auto min-w-0 border-0 bg-transparent outline-none"
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
          />
          <svg
            className="-mr-1 h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isExpanded && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-800 shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={0}
        >
          <div className="py-1" role="selectplayercolor">
            {options.map((option) => (
              <span
                key={nanoid()}
                className="block cursor-pointer px-4 py-2 text-sm text-white hover:bg-zinc-700"
                role="colormenuitem"
                tabIndex={0}
                onClick={() => {
                  setValue(option);
                  setIsExpanded(false);
                }}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectWithText;

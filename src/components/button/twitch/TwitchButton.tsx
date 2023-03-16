import classNames from "classnames";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const TwitchButton = ({ children, className, ...props }: IProps) => {
  const clsBtn = classNames(
    "bg-violet-700 hover:bg-violet-800 text-white rounded px-4 py-2 flex items-center font-medium",
    className
  );
  return (
    <button className={clsBtn} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        className="mr-3 h-5 w-5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
          d="M215.2 260.8h-58.7L117.4 300H78.3v-39.2H6.6V52.2L26.1 0h267.3v182.6l-78.2 78.2zm52.2-91.2V26.1H52.2v189.1h58.7v39.1l39.1-39.1h71.7l45.7-45.6z"
        />
        <path
          fill="white"
          d="M195.6 78.3v78.3h26.1V78.3h-26.1zm-71.7 78.2H150V78.3h-26.1v78.2z"
        />
      </svg>
      {children}
    </button>
  );
};

export default TwitchButton;

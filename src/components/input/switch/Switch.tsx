import classNames from "classnames";
import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Switch = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { children, className, ...otherProps } = props;
  const clsInput = classNames(
    "peer ml-auto h-6 w-11 min-w-[44px] rounded-full bg-zinc-700 after:absolute after:top-1/2 after:right-[22px] after:h-5 after:w-5 after:-translate-y-1/2 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-800 peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-purple-500",
    className
  );
  return (
    <label className="relative inline-flex w-full cursor-pointer items-center">
      <span className="mr-3 text-sm font-medium text-white">{children}</span>
      <input
        ref={ref}
        type="checkbox"
        value=""
        className="peer sr-only"
        {...otherProps}
      />
      <div className={clsInput}></div>
    </label>
  );
});

Switch.displayName = "Switch";

export default Switch;

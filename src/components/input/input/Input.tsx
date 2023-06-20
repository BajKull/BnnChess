import classNames from "classnames";
import React from "react";
import { FieldError } from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const Input = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { className, error, ...otherProps } = props;
  const clsInput = classNames(
    "rounded bg-zinc-800 px-3 py-1 w-full border",
    className,
    {
      "border-transparent": !error,
      "border-red-500": error,
    }
  );
  return (
    <>
      <input className={clsInput} {...otherProps} ref={ref} />
      {error?.message && (
        <p className="mt-3 text-sm text-red-500">{error.message}</p>
      )}
    </>
  );
});

Input.displayName = "Input";

export default Input;

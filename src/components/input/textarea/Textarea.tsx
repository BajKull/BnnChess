import classNames from "classnames";
import React from "react";
import { FieldError } from "react-hook-form";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, IProps>((props, ref) => {
  const { className, error, ...otherProps } = props;
  const clsTextarea = classNames(
    "rounded bg-zinc-800 px-3 py-1 w-full border",
    className,
    {
      "border-transparent": !error,
      "border-red-500": error,
    }
  );
  return (
    <>
      <textarea className={clsTextarea} {...otherProps} ref={ref} />
      {error?.message && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;

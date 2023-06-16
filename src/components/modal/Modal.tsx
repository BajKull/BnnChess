"use client";

import { useTransition, animated } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import XMark from "@/../public/icons/xmark.svg";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  show: boolean;
}

const Modal = ({ children, onClose, show, ...props }: IProps) => {
  const [mounted, setMounted] = useState(false);
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150 },
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return ReactDOM.createPortal(
    <>
      {transitions(
        (style, i) =>
          i && (
            <animated.div
              className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center"
              style={style}
            >
              <div
                className="absolute -z-10 h-full w-full cursor-pointer bg-black bg-opacity-60"
                onClick={() => onClose()}
              />
              <div
                className="container-shadow custom-scroll flex h-5/6 min-h-[350px] w-11/12 items-center justify-center overflow-y-auto rounded-md bg-zinc-900 p-5 md:h-2/3 md:w-3/4 lg:p-10 xl:w-2/3"
                {...props}
              >
                <div className="relative h-full w-full">
                  <button
                    className="absolute top-0 right-0 cursor-pointer fill-white"
                    onClick={() => onClose()}
                  >
                    <XMark />
                  </button>
                  {children}
                </div>
              </div>
            </animated.div>
          )
      )}
    </>,

    document.body
  );
};

export default Modal;

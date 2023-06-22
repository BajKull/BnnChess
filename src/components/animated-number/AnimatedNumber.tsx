"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface IProps {
  from: number;
  to: number;
}

const AnimatedNumber = ({ from, to }: IProps) => {
  const divRef = useRef(null);

  const visible = useIntersectionObserver(divRef, {
    once: true,
    options: { threshold: 0.75, root: null, rootMargin: "0px" },
  });

  if (!visible) return <p ref={divRef}>{to}</p>;
  return <AN from={from} to={to} />;
};

const AN = ({ from, to }: IProps) => {
  const value = useSpring({
    from: { number: from },
    number: to,
    config: {
      mass: 1,
      tension: 20,
      friction: 10,
    },
  });

  return <animated.p>{value.number.to((v) => v.toFixed())}</animated.p>;
};

export default AnimatedNumber;

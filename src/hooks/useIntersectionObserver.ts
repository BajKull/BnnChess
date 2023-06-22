import { RefObject, useEffect, useState } from "react";

interface IProps {
  once?: boolean;
  options?: IntersectionObserverInit;
}

const useIntersectionObserver = (
  ref: RefObject<Element>,
  {
    once,
    options = { threshold: 0, root: null, rootMargin: "0%" },
  }: IProps = {}
) => {
  const [entry, setEntry] = useState<boolean>();

  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setEntry(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      options
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, options, ref]);

  return entry;
};

export default useIntersectionObserver;

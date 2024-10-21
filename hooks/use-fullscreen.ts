import { useEffect, useState } from "react";

export type ScreenDimension = { width: number; height: number };

/** 브라우저 화면의 크기를 구합니다. */
export default function useFullscreen() {
  const [dimension, setDimension] = useState<ScreenDimension>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window === undefined) return;

    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (typeof window === undefined) return () => {};

    const onResize = () =>
      setDimension({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return dimension;
}

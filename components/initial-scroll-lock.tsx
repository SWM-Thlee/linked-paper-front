"use client";

import { useEffect } from "react";
import useScrollLock from "@/hooks/use-scroll-lock";

export default function InitialScrollLock({
  children,
}: React.PropsWithChildren) {
  const [, setScrollLock] = useScrollLock();

  useEffect(() => {
    setScrollLock(true);
    return () => setScrollLock(false);
  }, [setScrollLock]);

  return children;
}

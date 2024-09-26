"use client";

import { useEffect, useRef } from "react";
import useScrollLock from "@/hooks/use-scroll-lock";
import { signature, Signature } from "@/utils/signature";

export default function InitialScrollLock({
  children,
}: React.PropsWithChildren) {
  const ref = useRef<Signature>(signature());
  const setScrollLock = useScrollLock(`InitialScrollLock-${ref.current}`);

  useEffect(() => {
    setScrollLock(true);
    return () => setScrollLock(false);
  }, [setScrollLock]);

  return children;
}

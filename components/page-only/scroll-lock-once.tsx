"use client";

import { useEffect, useRef } from "react";
import useScrollLock from "@/hooks/use-scroll-lock";
import { signature, Signature } from "@/utils/signature";

export default function ScrollLockOnce({ children }: React.PropsWithChildren) {
  const ref = useRef<Signature>(signature());
  const setScrollLock = useScrollLock(`ScrollLockOnce-${ref.current}`);

  useEffect(() => {
    setScrollLock(true);
    return () => setScrollLock(false);
  }, [setScrollLock]);

  return children;
}

"use client";

import { atom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

type Props = React.PropsWithChildren;

export const scrollLockAtom = atom(false);

export default function BodyWithScrollLock({ children }: Props) {
  const [enabled, setEnabled] = useState(false);
  const isLocked = useAtomValue(scrollLockAtom);
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    if (!bodyRef.current || !enabled) return;
    bodyRef.current.style.overflow = isLocked ? "hidden" : "auto";
  }, [enabled, isLocked]);

  return (
    <body
      ref={(ref) => {
        bodyRef.current = ref;
        setEnabled(true);
      }}
      className="bg-light-surfaceContainer dark:bg-dark-surfaceContainer"
    >
      {children}
    </body>
  );
}

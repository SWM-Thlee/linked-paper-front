"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { HeaderMode, headerModeAtom } from "../header/store";

type Props = {
  children?: React.ReactNode;
};

export default function FloatingLayout({ children }: Props) {
  const setHeaderMode = useSetAtom(headerModeAtom);

  useEffect(() => {
    setHeaderMode(HeaderMode.FLOATING);
    return () => setHeaderMode(HeaderMode.DEFAULT);
  }, [setHeaderMode]);

  return children;
}

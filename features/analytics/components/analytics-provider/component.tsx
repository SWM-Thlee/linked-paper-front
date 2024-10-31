"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { Analytics } from "firebase/analytics";
import { createAnalytics } from "../../config/firebase";
import { AnalyticsProviderContext } from "./context";
import { userIdAtom } from "../../store/user";

type Props = {
  children: React.ReactNode;
};

export default function AnalyticsProvider({ children }: Props) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const userId = useAtomValue(userIdAtom);

  useEffect(() => {
    if (typeof window === undefined) return;
    setAnalytics(createAnalytics(userId));
  }, [userId]);

  return (
    <AnalyticsProviderContext.Provider value={analytics}>
      {children}
    </AnalyticsProviderContext.Provider>
  );
}

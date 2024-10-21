"use client";

import { useEffect, useState } from "react";

import { Analytics } from "firebase/analytics";
import { createAnalytics } from "../../config/firebase";
import { AnalyticsProviderContext } from "./context";

type Props = {
  children: React.ReactNode;
};

export default function AnalyticsProvider({ children }: Props) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    if (typeof window === undefined) return;
    setAnalytics(createAnalytics());
  }, []);

  return (
    <AnalyticsProviderContext.Provider value={analytics}>
      {children}
    </AnalyticsProviderContext.Provider>
  );
}

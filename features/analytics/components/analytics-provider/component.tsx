"use client";

import { useEffect, useState } from "react";
import { Analytics } from "firebase/analytics";

import { createAnalytics } from "../../config/firebase";
import { AnalyticsProviderContext } from "./context";
import { getAnalyticsUserId } from "../../store/user";

type Props = {
  children: React.ReactNode;
};

export default function AnalyticsProvider({ children }: Props) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const userId = getAnalyticsUserId();

    if (userId) {
      setAnalytics(createAnalytics(userId));
    }
  }, []);

  return (
    <AnalyticsProviderContext.Provider value={analytics}>
      {children}
    </AnalyticsProviderContext.Provider>
  );
}

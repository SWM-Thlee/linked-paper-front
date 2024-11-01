"use client";

import * as React from "react";
import { Provider as JotaiProvider } from "jotai";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import AnalyticsProvider from "@/features/analytics/components/analytics-provider";

// QueryClient를 생성합니다.
function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });
}

let browserQueryClient: QueryClient | null = null;

function getQueryClient() {
  // Server의 경우 매 번 SSR 요청 때마다 생성됩니다.
  if (isServer) return createQueryClient();

  // Browser의 경우 한 번만 생성되도록 합니다.
  return browserQueryClient ?? (browserQueryClient = createQueryClient());
}

export default function StateProvider({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <JotaiProvider>
      <AnalyticsProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        </QueryClientProvider>
      </AnalyticsProvider>
    </JotaiProvider>
  );
}

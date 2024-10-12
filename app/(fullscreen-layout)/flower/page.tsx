import { Suspense } from "react";
import dynamic from "next/dynamic";

import FloatingLayout from "@/components/page-only/floating-layout";
import ScrollLockOnce from "@/components/page-only/scroll-lock-once";
import ViewLoading from "./components/view-loading";

const FlowerGraphView = dynamic(
  () => import("./components/flower-graph-view"),
  {
    ssr: false,
    loading: ViewLoading,
  },
);

export default function Page() {
  return (
    <ScrollLockOnce>
      <Suspense fallback={<ViewLoading />}>
        <FloatingLayout>
          <FlowerGraphView />
        </FloatingLayout>
      </Suspense>
    </ScrollLockOnce>
  );
}

import { Metadata } from "next";
import dynamic from "next/dynamic";

import { Flower } from "@/features/flower/types";
import ScrollLockOnce from "@/components/layout/scroll-lock-once";
import { createFlowerMetadata } from "@/features/seo/metadata/flower";
import ViewLoading from "@/app/(flower-page)/components/view-loading";

const FlowerGraphView = dynamic(
  () => import("@/app/(flower-page)/components/mobile/flower-graph-view"),
  {
    ssr: false,
    loading: ViewLoading,
  },
);

/* 특정 검색 페이지에 대한 메타데이터를 생성합니다. */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Flower.Query.Params;
}): Promise<Metadata> {
  return createFlowerMetadata({ searchParams });
}

export default function Page() {
  return (
    <ScrollLockOnce>
      <FlowerGraphView />
    </ScrollLockOnce>
  );
}
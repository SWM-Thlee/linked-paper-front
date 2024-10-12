"use client";

import { useMemo } from "react";
import { redirect, useSearchParams } from "next/navigation";

import { Flower } from "../../types";

export default function useFlowerParam() {
  const searchParams = useSearchParams();

  const targetPaperID = useMemo(
    () => searchParams.get(Flower.Query.PaperParam),
    [searchParams],
  );

  if (!targetPaperID)
    redirect("/error/400?from=Flower Correlations&reason=Invalid Paper ID");

  return targetPaperID;
}

"use client";

import { useCallback, useEffect } from "react";

import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import useSearchUpdate from "@/features/search/hooks/query/use-search-update";
import WarningIcon from "@/ui/icons/warning";
import Button from "@/ui/button";
import InfoIcon from "@/ui/icons/info";
import { InitialLoading, NextLoading } from "./defaults";

export function SimilarityWarning() {
  const { requiredQuery } = useSearchQueryInfo();
  const { update } = useSearchUpdate();

  const disableLimitation = useCallback(() => {
    update({ ...requiredQuery, similarity_limit: false });
    if (typeof window !== undefined) window.scrollTo({ top: 0 });
  }, [update, requiredQuery]);

  return (
    <div className="flex flex-col justify-between gap-8 rounded-b-6 bg-gradient-to-b from-light-surfaceBright/15 from-5% to-light-tertiaryContainer p-8 pt-24 text-light-onTertiaryContainer dark:from-dark-surfaceBright/15 dark:to-dark-tertiaryContainer dark:text-dark-onTertiaryContainer">
      <div className="flex flex-col gap-4">
        <WarningIcon ui_size="large" />
        <div className="text-title-large">
          Next search results may be significantly less similar. <br />
          Do you want to disable Similar Limitation?
        </div>
      </div>
      <Button
        ui_color="tertiary"
        ui_size="large"
        className="self-start text-label-large"
        onClick={disableLimitation}
      >
        Disable and Search Again
      </Button>
    </div>
  );
}

export function InitialFailed({ onRefetch }: { onRefetch: () => void }) {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      <InitialLoading />
      <div className="absolute left-0 top-0 flex h-full w-full animate-fadeIn flex-col gap-6 rounded-6 p-8 text-light-onSurface backdrop-blur dark:text-dark-onSurface">
        <InfoIcon ui_size="large" />
        <div className="text-title-large">
          It seems something is wrong with searching...
        </div>
        <div className="max-w-[75%]">
          Don&apos;t worry! This may be because the search results were
          temporarily unable to load. Please click the button below to try the
          search again.
        </div>
        <Button
          ui_color="tertiary"
          ui_size="large"
          onClick={onRefetch}
          className="self-start"
        >
          Request Again
        </Button>
      </div>
    </div>
  );
}

export function NextFailed({ onRefetch }: { onRefetch: () => void }) {
  return (
    <div className="relative">
      <NextLoading />
      <div className="absolute left-0 top-0 flex h-full w-full animate-fadeIn flex-col gap-6 rounded-6 p-8 text-light-onSurface backdrop-blur dark:text-dark-onSurface">
        <InfoIcon ui_size="large" />
        <div className="text-title-large">
          It seems something is wrong with searching...
        </div>
        <div className="max-w-[75%]">
          Don&apos;t worry! This may be because the search results were
          temporarily unable to load. Please click the button below to try the
          search again.
        </div>
        <Button
          ui_color="tertiary"
          ui_size="large"
          onClick={onRefetch}
          className="self-start"
        >
          Request Again
        </Button>
      </div>
    </div>
  );
}

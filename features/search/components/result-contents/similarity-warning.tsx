"use client";

import Button from "@/ui/button";
import WarningIcon from "@/ui/icons/warning";

export default function SearchSimilarityWarning() {
  return (
    <div className="flex flex-col items-center justify-between gap-8 rounded-b-6 bg-gradient-to-b from-light-surfaceBright/15 from-5% to-light-tertiaryContainer p-8 pt-24 text-light-onTertiaryContainer dark:from-dark-surfaceBright/15 dark:to-dark-tertiaryContainer dark:text-dark-onTertiaryContainer">
      <div className="flex items-center gap-4">
        <WarningIcon ui_size="large" />
        <span className="text-title-large">
          Future search results may be significantly less similar. Do you want
          to continue searching?
        </span>
      </div>
      <Button ui_color="tertiary" ui_size="large">
        Continue Searching
      </Button>
    </div>
  );
}

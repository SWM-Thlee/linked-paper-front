import { Suspense } from "react";

import Completion from "@/components/completion/component";
import Suggestions from "@/features/suggestion/components/suggestions";
import SuggestionsSkeleton from "@/features/suggestion/components/suggestions-skeleton";
import MobilePageContainer from "@/components/layout/mobile-page-container";
import InfoIcon from "@/ui/icons/info";
import FieldContainer from "@/ui/container/field-container";
import SearchIcon from "@/ui/icons/search";
import SearchForm from "../../components/search-form";

export default function MainPage() {
  return (
    <MobilePageContainer>
      <div className="flex flex-col gap-16 rounded-4 bg-light-surfaceBright/15 p-6 pb-48 dark:bg-dark-surfaceBright/15">
        <div className="flex items-center gap-2 rounded-3 bg-light-secondary p-3 text-light-onSecondary dark:bg-dark-secondary dark:text-dark-onSecondary">
          <InfoIcon />
          <div className="text-label-small">
            Currently, supports only Computer Science papers.
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <Completion>
            <FieldContainer
              field={
                <div className="flex items-center gap-2 text-label-medium">
                  <SearchIcon ui_size="small" /> AI SEARCH
                </div>
              }
            >
              <SearchForm
                defaultPlaceholder="Describe what you want."
                ui_size="small"
              />
            </FieldContainer>
            <Suspense fallback={<SuggestionsSkeleton ui_variant="vertical" />}>
              <Suggestions ui_variant="vertical" />
            </Suspense>
          </Completion>
        </div>
      </div>
    </MobilePageContainer>
  );
}

import Button from "@/ui/button";
import FieldContainer from "@/ui/container/field-container";
import AddIcon from "@/ui/icons/add";
import TipIcon from "@/ui/icons/tip";
import ArrowForwardIcon from "@/ui/icons/arrow-forward";
import { SuggestionsProps, suggestionsVariant } from "./variants";

export default function SuggestionsSkeleton({ ui_variant }: SuggestionsProps) {
  const { root, item, nextButton, nextButtonText } = suggestionsVariant({
    ui_variant,
  });

  return (
    <FieldContainer
      field={
        <div className="flex items-center gap-2 text-label-medium">
          <TipIcon ui_size="small" /> <span>SUGGESTIONS</span>
        </div>
      }
    >
      <div className={root()}>
        <Button
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className={item()}
        >
          <div className="h-12 w-full animate-pulse rounded-2 bg-light-onSecondaryContainer/25 dark:bg-dark-onSecondaryContainer/25" />
          <ArrowForwardIcon />
        </Button>
        <Button
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className={item()}
        >
          <div className="h-12 w-full animate-pulse rounded-2 bg-light-onSecondaryContainer/25 dark:bg-dark-onSecondaryContainer/25" />
          <ArrowForwardIcon />
        </Button>
        <Button
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className={nextButton()}
        >
          <div className={nextButtonText()}>Need more suggestions?</div>
          <AddIcon />
        </Button>
      </div>
    </FieldContainer>
  );
}

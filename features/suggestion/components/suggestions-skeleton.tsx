import Button from "@/ui/button";
import FieldContainer from "@/ui/container/field-container";
import AddIcon from "@/ui/icons/add";
import TipIcon from "@/ui/icons/tip";

export default function SuggestionsSkeleton() {
  return (
    <FieldContainer title="Suggestions">
      <div className="grid grid-cols-[5fr_5fr_2fr] gap-4">
        <Button
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className="flex animate-fadeIn select-none flex-col justify-between gap-2 p-6 text-left"
        >
          <TipIcon ui_size="large" />
          <div className="h-12 w-full animate-pulse rounded-2 bg-light-onSecondaryContainer/25 dark:bg-dark-onSecondaryContainer/25" />
        </Button>
        <Button
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className="flex animate-fadeIn select-none flex-col justify-between gap-2 p-6 text-left"
        >
          <TipIcon ui_size="large" />
          <div className="h-12 w-full animate-pulse rounded-2 bg-light-onSecondaryContainer/25 dark:bg-dark-onSecondaryContainer/25" />
        </Button>
        <Button
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className="flex select-none flex-col justify-between gap-2 p-6 text-left"
        >
          <AddIcon ui_size="exlarge" />
          <div className="text-body-large">Need more suggestions?</div>
        </Button>
      </div>
    </FieldContainer>
  );
}

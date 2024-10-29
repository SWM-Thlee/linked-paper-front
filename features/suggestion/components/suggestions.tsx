"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { queryOptions } from "@/features/suggestion/server/queries";
import useCompletion from "@/components/completion/hooks/use-completion";
import FieldContainer from "@/ui/container/field-container";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import ArrowForwardIcon from "@/ui/icons/arrow-forward";
import TipIcon from "@/ui/icons/tip";
import { SuggestionsProps, suggestionsVariant } from "./variants";

export default function Suggestions({ ui_variant }: SuggestionsProps) {
  const { data, refetch } = useSuspenseQuery(queryOptions.suggestions(2));
  const { requestQuery } = useCompletion();
  const { root, item, itemText, nextButton, nextButtonText } =
    suggestionsVariant({
      ui_variant,
    });

  return (
    <FieldContainer
      field={
        <div className="flex items-center gap-2 text-label-medium">
          <TipIcon ui_size="small" /> SUGGESTIONS
        </div>
      }
    >
      <div className={root()}>
        {data.map((suggestion) => (
          <Button
            key={suggestion}
            onClick={() => requestQuery(suggestion)}
            ui_color="secondary"
            ui_variant="light"
            ui_size="large"
            className={item()}
          >
            <div className={itemText()}>{suggestion}</div>
            <ArrowForwardIcon />
          </Button>
        ))}
        <Button
          onClick={() => refetch()}
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

"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { queryOptions } from "@/features/suggestion/server/queries";
import useCompletion from "@/components/completion/hooks/use-completion";
import FieldContainer from "@/ui/container/field-container";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import ArrowForwardIcon from "@/ui/icons/arrow-forward";

export default function Suggestions() {
  const { data, refetch } = useSuspenseQuery(queryOptions.suggestions(2));
  const { requestQuery } = useCompletion();

  return (
    <FieldContainer title="Suggestions">
      <div className="flex items-center gap-4">
        {data.map((suggestion) => (
          <Button
            key={suggestion}
            onClick={() => requestQuery(suggestion)}
            ui_color="secondary"
            ui_variant="light"
            ui_size="large"
            className="flex flex-1 animate-fadeIn select-none items-center justify-between gap-2 p-6 text-left"
          >
            <div className="w-[16rem] text-label-large">{suggestion}</div>
            <ArrowForwardIcon />
          </Button>
        ))}
        <Button
          onClick={() => refetch()}
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className="flex select-none items-center justify-between gap-4 p-6 text-left"
        >
          <div className="w-[8rem] text-label-large">
            Need more suggestions?
          </div>
          <AddIcon />
        </Button>
      </div>
    </FieldContainer>
  );
}

"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { queryOptions } from "@/features/suggestion/server/queries";
import useCompletion from "@/components/completion/hooks/use-completion";
import FieldContainer from "@/ui/container/field-container";
import TipIcon from "@/ui/icons/tip";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";

export default function Suggestions() {
  const { data, refetch } = useSuspenseQuery(queryOptions.suggestions(2));
  const { requestQuery } = useCompletion();

  return (
    <FieldContainer title="Suggestions">
      <div className="grid grid-cols-[5fr_5fr_2fr] gap-4">
        {data.map((suggestion) => (
          <Button
            key={suggestion}
            onClick={() => requestQuery(suggestion)}
            ui_color="secondary"
            ui_variant="light"
            ui_size="large"
            className="flex animate-fadeIn select-none flex-col justify-between gap-2 p-6 text-left"
          >
            <TipIcon ui_size="large" />
            <div className="text-body-large">{suggestion}</div>
          </Button>
        ))}
        <Button
          onClick={() => refetch()}
          ui_color="secondary"
          ui_variant="light"
          ui_size="large"
          className="flex select-none flex-col items-center justify-between gap-2 p-6"
        >
          <AddIcon ui_size="exlarge" />
          <div className="text-body-large">Need more suggestions?</div>
        </Button>
      </div>
    </FieldContainer>
  );
}

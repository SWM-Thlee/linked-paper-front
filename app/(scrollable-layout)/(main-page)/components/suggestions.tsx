"use client";

import useCompletion from "@/components/completion/hooks/use-completion";
import FieldContainer from "@/ui/container/field-container";
import TipIcon from "@/ui/icons/tip";
import LabelButton from "@/ui/label-button";

const SUGGESTIONS = [
  "Can AI really understand human emotions?",
  "What's the latest on global warming effects?",
  "How close are we to practical quantum computers?",
  "Is our brain actually similar to a computer?",
];

function Suggestion({ suggestion }: { suggestion: string }) {
  const { requestQuery } = useCompletion();

  return (
    <LabelButton
      onClick={() => requestQuery(suggestion)}
      ui_color="secondary"
      ui_variant="bordered"
      ui_size="small"
    >
      <TipIcon ui_size="small" />
      {suggestion}
    </LabelButton>
  );
}

export default function Suggestions() {
  return (
    <FieldContainer title="Suggestions">
      <div className="flex flex-wrap items-center gap-4">
        {SUGGESTIONS.map((suggestion) => (
          <Suggestion key={suggestion} suggestion={suggestion} />
        ))}
      </div>
    </FieldContainer>
  );
}

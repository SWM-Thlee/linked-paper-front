import { Popover } from "@/ui/popover";

import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";
import ReferenceIcon from "@/ui/icons/reference";
import CitationIcon from "@/ui/icons/citation";

export interface OthersChipProps {
  date: string;
  referenceCount: number;
  citationCount: number;
}

export default function OthersChip({
  date,
  referenceCount,
  citationCount,
}: OthersChipProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_variant="light">
          <DateIcon ui_size="small" /> {date}
          <SpliterIcon />
          <CitationIcon ui_size="small" /> {citationCount}
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col">
          <Button
            ui_color="secondary"
            ui_size="small"
            ui_variant="ghost"
            className="flex items-center justify-between gap-24"
          >
            <div className="flex items-center gap-2">
              <DateIcon ui_size="small" /> Date
            </div>
            <div className="text-label-large">{date}</div>
          </Button>
          <Button
            ui_color="secondary"
            ui_size="small"
            ui_variant="ghost"
            className="flex items-center justify-between gap-24"
          >
            <div className="flex items-center gap-2">
              <ReferenceIcon ui_size="small" /> Reference
            </div>
            <div className="text-label-large">{referenceCount}</div>
          </Button>
          <Button
            ui_color="secondary"
            ui_size="small"
            ui_variant="ghost"
            className="flex items-center justify-between gap-24"
          >
            <div className="flex items-center gap-2">
              <CitationIcon ui_size="small" /> Citation
            </div>
            <div className="text-label-large">{citationCount}</div>
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

import { Popover } from "@/ui/popover";

import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";
import ReferenceIcon from "@/ui/icons/reference";
import CitationIcon from "@/ui/icons/citation";

export interface OthersChipProps {
  date: string;
  reference_count: number;
  citation_count: number;
}

export default function OthersChip({
  date,
  reference_count,
  citation_count,
}: OthersChipProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton>
          <DateIcon ui_size="small" /> {date}
          <SpliterIcon />
          <CitationIcon ui_size="small" /> {citation_count}
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
            <div className="text-label-large">{reference_count}</div>
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
            <div className="text-label-large">{citation_count}</div>
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

import { Popover } from "@/ui/popover";

import JournalIcon from "@/ui/icons/journal";
import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";

type Props = {
  journal: string;
  date: string;
  children?: React.ReactNode;
};

export default function OthersChip({ journal, date, children }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        {children ?? (
          <LabelButton>
            <JournalIcon ui_size="small" /> {journal}
            <SpliterIcon />
            <DateIcon ui_size="small" /> {date}
            {/* <SpliterIcon />
            <ReferenceIcon ui_size="small" /> {reference_count} */}
          </LabelButton>
        )}
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
              <JournalIcon ui_size="small" /> Source
            </div>
            <div className="text-label-large">{journal}</div>
          </Button>
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
          {/* <Button
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
              <CitiationIcon ui_size="small" /> Citiation
            </div>
            <div className="text-label-large">{citiation_count}</div>
          </Button> */}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

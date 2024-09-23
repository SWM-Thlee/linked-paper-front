import { Popover } from "@/ui/popover";

import JournalIcon from "@/ui/icons/journal";
import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import ReferenceIcon from "@/ui/icons/reference";
import CitiationIcon from "@/ui/icons/citiation";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";

type Props = {
  journal: string;
  date: string;
  reference_count: number;
  citiation_count: number;
  children?: React.ReactNode;
};

export default function OthersChip({
  journal,
  date,
  reference_count,
  citiation_count,
  children,
}: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        {children ?? (
          <LabelButton>
            <JournalIcon ui_size="small" /> {journal}
            <SpliterIcon />
            <DateIcon ui_size="small" /> {date}
            <SpliterIcon />
            <ReferenceIcon ui_size="small" /> {reference_count}
          </LabelButton>
        )}
      </Popover.Trigger>
      <Popover.Content ui_size="large">
        <div className="flex flex-col gap-6">
          <div className="select-none text-title-medium">Other Information</div>
          <div className="flex flex-col gap-2">
            <Button
              ui_color="secondary"
              ui_size="small"
              ui_variant="light"
              className="flex items-center justify-between gap-12"
            >
              <div className="flex items-center gap-2">
                <JournalIcon ui_size="small" /> Journal
              </div>
              <div className="text-label-large">{journal}</div>
            </Button>
            <Button
              ui_color="secondary"
              ui_size="small"
              ui_variant="light"
              className="flex items-center justify-between gap-12"
            >
              <div className="flex items-center gap-2">
                <DateIcon ui_size="small" /> Date
              </div>
              <div className="text-label-large">{date}</div>
            </Button>
            <Button
              ui_color="secondary"
              ui_size="small"
              ui_variant="light"
              className="flex items-center justify-between gap-12"
            >
              <div className="flex items-center gap-2">
                <ReferenceIcon ui_size="small" /> Reference
              </div>
              <div className="text-label-large">{reference_count}</div>
            </Button>
            <Button
              ui_color="secondary"
              ui_size="small"
              ui_variant="light"
              className="flex items-center justify-between gap-12"
            >
              <div className="flex items-center gap-2">
                <CitiationIcon ui_size="small" /> Citiation
              </div>
              <div className="text-label-large">{citiation_count}</div>
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

import { Popover } from "@/ui/popover";
import { PaperMetadata } from "@/types/paper";

import JournalIcon from "@/ui/icons/journal";
import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import ReferenceIcon from "@/ui/icons/reference";
import CitiationIcon from "@/ui/icons/citiation";
import LabelButton from "@/ui/label-button";

type Props = Pick<
  PaperMetadata,
  "journal" | "date" | "reference_count" | "citiation_count"
>;

export default function SearchResultAttributeOthers({
  journal,
  date,
  reference_count,
  citiation_count,
}: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_size="small" ui_variant="light">
          <JournalIcon ui_size="small" /> {journal}
          <SpliterIcon />
          <DateIcon ui_size="small" /> {date}
          <SpliterIcon />
          <ReferenceIcon ui_size="small" /> {reference_count}
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-4 p-4">
          <div className="text-title-large">Other Information</div>
          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-2 text-title-medium">
            <div className="flex items-center gap-2">
              <JournalIcon /> Journal
            </div>
            <span className="text-label-large">{journal}</span>
            <div className="flex items-center gap-2">
              <DateIcon /> Date
            </div>
            <span className="text-label-large">{date}</span>
            <div className="flex items-center gap-2">
              <ReferenceIcon /> Reference
            </div>
            <span className="text-label-large">{reference_count}</span>
            <div className="flex items-center gap-2">
              <CitiationIcon /> Citiation
            </div>
            <span className="text-label-large">{citiation_count}</span>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

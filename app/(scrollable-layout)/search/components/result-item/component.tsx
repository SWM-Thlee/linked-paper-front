import { Search } from "@/features/search/types";
import AuthorChip from "@/features/search/components/chip/author";
import { CategoryChip } from "@/features/search/components/chip/category";
import CategoryIcon from "@/ui/icons/category";
import LabelButton from "@/ui/label-button";
import AuthorIcon from "@/ui/icons/author";
import OthersChip from "@/features/search/components/chip/others";
import JournalIcon from "@/ui/icons/journal";
import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import SearchResultItemLinks from "./links/component";
import Abstraction from "./abstraction";

export default function SearchResultItem({
  id,
  title,
  abstraction,
  authors,
  categories,
  journal,
  date,
  link,
}: Search.Result.Data) {
  return (
    <div className="grid animate-slideUpAndFade grid-cols-[auto_10rem] gap-8">
      <div className="flex flex-1 flex-col gap-8">
        <div className="text-headline-small text-light-onSurface dark:text-dark-onSurface">
          {title}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AuthorChip authors={authors}>
            {(titleOfChip) => (
              <LabelButton
                ui_size="small"
                ui_color="secondary"
                ui_variant="light"
              >
                <AuthorIcon ui_size="small" />
                <div className="max-w-[10rem] overflow-hidden text-ellipsis">
                  {titleOfChip}
                </div>
              </LabelButton>
            )}
          </AuthorChip>
          <CategoryChip categoryIDs={categories}>
            {(titleOfChip) => (
              <LabelButton
                ui_size="small"
                ui_color="secondary"
                ui_variant="light"
              >
                <CategoryIcon ui_size="small" />
                <div className="max-w-[15rem] overflow-hidden text-ellipsis">
                  {titleOfChip}
                </div>
              </LabelButton>
            )}
          </CategoryChip>
          <OthersChip journal={journal} date={date}>
            <LabelButton
              ui_color="secondary"
              ui_size="small"
              ui_variant="light"
            >
              <JournalIcon ui_size="small" /> {journal}
              <SpliterIcon />
              <DateIcon ui_size="small" /> {date}
              {/* <SpliterIcon />
              <ReferenceIcon ui_size="small" /> {reference_count} */}
            </LabelButton>
          </OthersChip>
        </div>
        <Abstraction>{abstraction}</Abstraction>
      </div>
      <SearchResultItemLinks id={id} link={link} />
    </div>
  );
}

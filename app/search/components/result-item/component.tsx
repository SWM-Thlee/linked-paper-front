import { SearchResult } from "../../../../features/search/types/result";
import SearchResultItemInfo from "./attributes/component";
import SearchResultItemLinks from "./links/component";

export default function SearchResultItem({
  id,
  title,
  abstraction,
  authors,
  categories,
  journal,
  date,
  reference_count,
  citiation_count,
  link,
}: SearchResult) {
  return (
    <div className="flex animate-scaleIn gap-8">
      <div className="flex flex-1 flex-col gap-4">
        <div className="text-headline-small text-light-onSurface dark:text-dark-onSurface">
          {title}
        </div>
        <SearchResultItemInfo
          authors={authors}
          categories={categories}
          journal={journal}
          date={date}
          reference_count={reference_count}
          citiation_count={citiation_count}
        />
        <div className="line-clamp-3 text-body-large text-light-onSurface dark:text-dark-onSurface">
          {abstraction}
        </div>
      </div>
      <SearchResultItemLinks id={id} link={link} />
    </div>
  );
}

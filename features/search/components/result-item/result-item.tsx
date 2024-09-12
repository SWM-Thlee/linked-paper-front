import { SearchResult } from "../../types/result";
import SearchResultItemInfo from "./attributes/attributes";
import SearchResultItemLinks from "./links/links";

export default function SearchResultItem({
  id,
  title,
  abstraction,
  authors,
  fields,
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
          fields={fields}
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

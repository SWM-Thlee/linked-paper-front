import { SearchResult } from "../../../../features/search/types/result";
import SearchResultAttributeAuthors from "./attributes/authors";
import SearchResultAttributeCategories from "./attributes/categories";
import SearchResultAttributeOthers from "./attributes/others";
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
    <div className="grid animate-scaleIn grid-cols-[auto_12rem] gap-8">
      <div className="flex flex-1 flex-col gap-8">
        <div className="text-headline-small text-light-onSurface dark:text-dark-onSurface">
          {title}
        </div>
        <div className="flex flex-wrap gap-2">
          <SearchResultAttributeAuthors authors={authors} />
          <SearchResultAttributeCategories categories={categories} />
          <SearchResultAttributeOthers
            journal={journal}
            date={date}
            reference_count={reference_count}
            citiation_count={citiation_count}
          />
        </div>
        <div className="line-clamp-3 text-body-large text-light-onSurface dark:text-dark-onSurface">
          {abstraction}
        </div>
      </div>
      <SearchResultItemLinks id={id} link={link} />
    </div>
  );
}

import FilterIcon from "@/ui/icons/filter";

export default function SearchNavigationFilter() {
  return (
    <div className="rounded-4 bg-light-tertiaryContainer p-4 dark:bg-dark-tertiaryContainer">
      <div className="flex items-center gap-4 text-title-medium text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer">
        <FilterIcon /> Filters
      </div>
    </div>
  );
}

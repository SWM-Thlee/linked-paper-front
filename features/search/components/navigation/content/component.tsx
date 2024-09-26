import Search from "@/ui/search";
import SearchNavigationFilter from "./filter";
import SearchNavigationHistory from "./history";

export default function SearchNavigationContent() {
  return (
    <div className="flex min-h-[50vh] flex-col gap-6">
      <Search ui_size="medium" />
      <div className="grid grid-cols-[1fr_2fr] gap-6">
        <SearchNavigationFilter />
        <SearchNavigationHistory />
      </div>
    </div>
  );
}

import { NavigationModule } from "@/ui/navigation";
import SearchIcon from "@/ui/icons/search";
import SearchNavigationContent from "./content/component";

export const navigation: NavigationModule = {
  type: "dropdown",
  key: "search",
  content: <SearchNavigationContent />,
  title: (
    <div className="flex items-center gap-2">
      <SearchIcon ui_size="small" />
      <div className="text-label-large">Search</div>
    </div>
  ),
};

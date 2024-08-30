import { NavigationModule } from "@/ui/navigation";

import SearchNavigationTitle from "./title";
import { SearchNavigationContent } from "./content";

export const navigation: NavigationModule = {
  type: "dropdown",
  key: "search",
  title: <SearchNavigationTitle />,
  content: <SearchNavigationContent />,
};

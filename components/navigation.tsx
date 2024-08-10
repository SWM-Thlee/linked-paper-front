"use client";

import UiNavigation, { NavigationItem } from "@/ui/navigation";
import {
  MdAutoAwesome as TrendsIcon,
  MdSearch as SearchIcon,
  MdWifiTethering as FlowersIcon,
} from "react-icons/md";

const items: NavigationItem[] = [
  {
    elementType: "dropdown",
    key: "search",
    title: (
      <div className="flex items-center gap-2">
        <SearchIcon size={14} />
        <div className="text-label-large">Search</div>
      </div>
    ),
    content: <div>TBD</div>,
  },
  {
    elementType: "dropdown",
    key: "flowers",
    title: (
      <div className="flex items-center gap-2">
        <FlowersIcon size={14} />
        <div className="text-label-large">Flowers</div>
      </div>
    ),
    content: <div>TBD</div>,
  },
  {
    elementType: "dropdown",
    key: "trends",
    title: (
      <div className="flex items-center gap-2">
        <TrendsIcon size={14} />
        <div className="text-label-large">Trends</div>
      </div>
    ),
    content: <div>TBD</div>,
  },
];

export default function Navigation() {
  return (
    <div className="justify-self-center">
      <UiNavigation color="primary" items={items} />
    </div>
  );
}

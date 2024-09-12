import React from "react";
import SearchIcon from "@/ui/icons/search";

export default function SearchNavigationTitle() {
  return (
    <div className="flex items-center gap-2">
      <SearchIcon _size="small" />
      <div className="text-label-large">Search</div>
    </div>
  );
}

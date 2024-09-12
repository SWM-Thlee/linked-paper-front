"use client";

import Button from "@/ui/button";
import EditIcon from "@/ui/icons/edit";
import Popover from "@/ui/popover";
import Search from "@/ui/search";

import SearchSorting from "./sorting";

export default function SearchResultHeader() {
  return (
    <div className="flex flex-col gap-8 rounded-t-ex-large bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <Search />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover
            trigger={
              <Button _color="secondary" _variant="bordered">
                Filters
              </Button>
            }
          >
            Hello!
          </Popover>

          <Button _color="secondary" className="flex items-center gap-2">
            <EditIcon _size="small" />
            <div>Edit Filter...</div>
          </Button>
        </div>
        <SearchSorting />
      </div>
    </div>
  );
}

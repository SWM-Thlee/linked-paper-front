"use client";

import Button from "@/ui/button";
import EditIcon from "@/ui/icons/edit";
import { Popover } from "@/ui/popover";
import Search from "@/ui/search";
import SearchSorting from "./sorting";
import { FilterSettings } from "../filter-settings";

export default function SearchResultHeader() {
  return (
    <div className="flex flex-col gap-8 rounded-t-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <Search />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button ui_color="secondary" ui_variant="bordered">
                Filters
              </Button>
            </Popover.Trigger>
            <Popover.Content>Hello!</Popover.Content>
          </Popover.Root>
          <FilterSettings>
            <Button ui_color="secondary" className="flex items-center gap-2">
              <EditIcon ui_size="small" />
              <div>Edit Filter...</div>
            </Button>
          </FilterSettings>
        </div>
        <SearchSorting />
      </div>
    </div>
  );
}

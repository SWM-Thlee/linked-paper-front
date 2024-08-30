"use client";

import HistoryIcon from "@/ui/icons/history";
import * as Accordion from "@/ui/accordion";
import Popover from "@/ui/popover";
import Button from "@/ui/button";

import useIsClient from "@/hooks/use-is-client";
import useSearchHistory from "@/features/search/hooks/use-search-history";

export default function SearchNavigationHistory() {
  // 검색 기록은 (현재는) 클라이언트에 종속되므로 이를 고려합니다.
  const isClient = useIsClient();
  const history = useSearchHistory();

  return (
    <div className="flex flex-col justify-between gap-4 overflow-y-auto rounded-[16px] border-[1px] border-light-outlineVariant p-4 scrollbar dark:border-dark-outlineVariant">
      <div className="flex items-center gap-4 text-title-medium text-light-onSurface dark:text-dark-onSurface">
        <HistoryIcon /> Recent Search History
      </div>
      {isClient && (
        <Accordion.Root type="single" ui_variant="list" collapsible>
          {history.map(({ id, query }) => (
            <Accordion.ListItem
              value={id}
              key={id}
              ui_size="large"
              ui_trigger={query}
              ui_content={
                <div className="flex justify-between gap-2">
                  <Popover
                    trigger={
                      <Button _color="tertiary" _size="small">
                        Filters
                      </Button>
                    }
                  >
                    Hello
                  </Popover>
                  <div className="flex gap-2">
                    <Button
                      _color="secondary"
                      _variant="bordered"
                      _size="small"
                    >
                      Edit
                    </Button>
                    <Button _color="error" _variant="bordered" _size="small">
                      Delete
                    </Button>
                    <Button _size="small">Search</Button>
                  </div>
                </div>
              }
            />
          ))}
        </Accordion.Root>
      )}
    </div>
  );
}

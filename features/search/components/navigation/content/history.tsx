"use client";

import HistoryIcon from "@/ui/icons/history";
import { Popover } from "@/ui/popover";
import Button from "@/ui/button";

import useIsClient from "@/hooks/use-is-client";
import useSearchHistory from "@/features/search/hooks/history/use-search-history";
import { Accordion } from "@/ui/accordion";

export default function SearchNavigationHistory() {
  // 검색 기록은 (현재는) 클라이언트에 종속되므로 이를 고려합니다.
  const isClient = useIsClient();
  const history = useSearchHistory();

  return (
    <div className="flex flex-col justify-between gap-4 overflow-y-auto rounded-4 border-[1px] border-light-outlineVariant p-4 scrollbar dark:border-dark-outlineVariant">
      <div className="flex items-center gap-4 text-title-medium text-light-onSurface dark:text-dark-onSurface">
        <HistoryIcon /> Recent Search History
      </div>
      {isClient && (
        <Accordion.Root type="single" collapsible>
          {history.map(({ id, query }) => (
            <Accordion.Item
              value={id}
              key={id}
              ui_size="large"
              itemTrigger={query}
            >
              <div className="flex justify-between gap-2">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Button ui_color="tertiary" ui_size="small">
                      Filters
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>Hello</Popover.Content>
                </Popover.Root>
                <div className="flex gap-2">
                  <Button
                    ui_color="secondary"
                    ui_variant="bordered"
                    ui_size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    ui_color="error"
                    ui_variant="bordered"
                    ui_size="small"
                  >
                    Delete
                  </Button>
                  <Button ui_size="small">Search</Button>
                </div>
              </div>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}
    </div>
  );
}

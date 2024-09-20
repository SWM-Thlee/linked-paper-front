"use client";

import HistoryIcon from "@/ui/icons/history";
import * as Accordion from "@/ui/accordion";
import Popover from "@/ui/popover";
import Button from "@/ui/button";

import useIsClient from "@/hooks/use-is-client";
import useSearchHistory from "@/features/search/hooks/use-search-history";
import { HStack, VStack } from "@/components/stactk";

function StyledTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-title-medium text-light-onSurface dark:text-dark-onSurface">
      {children}
    </div>
  );
}

export default function SearchNavigationHistory() {
  // 검색 기록은 (현재는) 클라이언트에 종속되므로 이를 고려합니다.
  const isClient = useIsClient();
  const history = useSearchHistory();

  return (
    <div className="overflow-y-auto rounded-[16px] border-[1px] border-light-outlineVariant p-4 scrollbar dark:border-dark-outlineVariant">
      {/* Layout과 Style을 분리했는데, 스타일과 레이아웃이 분리되면 유지보수가 쉽고, 가독성이 향상됩니다. */}
      <VStack className="justify-between gap-4">
        <HStack className="items-center gap-4">
          <HistoryIcon />
          {/* StyledTitle을 공통 텍스트 컴포넌트로 추출하는 방법도 있겠죠? 예를 들어, SubTitle, Title, Caption 등으로 일관된 컴포넌트로 관리하는것이 가능합니다 */}
          <StyledTitle>Recent Search History</StyledTitle>
        </HStack>
        {isClient && (
          <Accordion.Root type="single" ui_variant="list" collapsible>
            {history.map(({ id, query }) => (
              <Accordion.ListItem
                value={id}
                key={id}
                ui_size="large"
                ui_trigger={query}
                ui_content={
                  <HStack className="justify-between gap-2">
                    <Popover
                      trigger={
                        <Button _color="tertiary" _size="small">
                          Filters
                        </Button>
                      }
                    >
                      Hello
                    </Popover>
                    <HStack className="gap-2">
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
                    </HStack>
                  </HStack>
                }
              />
            ))}
          </Accordion.Root>
        )}
      </VStack>
    </div>
  );
}

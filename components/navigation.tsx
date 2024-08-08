"use client";

import Tab from "@/ui/tab";
import { createTabs, Tabs } from "@/ui/tabs";
import { Key, useCallback, useState } from "react";
import {
  MdAutoAwesome as TrendsIcon,
  MdSearch as SearchIcon,
  MdWifiTethering as FlowersIcon,
} from "react-icons/md";

// 의미 검색, 그래프 뷰, 트렌드로 구성됩니다.
const [items, keys] = createTabs([
  {
    tabName: "Search",
    tabIcon: SearchIcon,
  },
  {
    tabName: "Flowers",
    tabIcon: FlowersIcon,
  },
  {
    tabName: "Trends",
    tabIcon: TrendsIcon,
  },
]);

export default function Navigation() {
  const [selected, setSelected] = useState<string>("Search");

  const onSelectionChange = useCallback((key: Key) => {
    // 각 컴포넌트의 Key는 위의 Tab의 Title 중 하나여야 합니다.
    if (typeof key !== "string" || !keys.includes(key)) return;

    // 의미 검색 기능만 지원하도록 합니다.
    if (key !== "Search") {
      return;
    }

    setSelected(key);
  }, []);

  return (
    <Tabs
      key="tabs"
      className="justify-self-center"
      items={items}
      selectedKey={selected}
      onSelectionChange={onSelectionChange}
    >
      {(item) => <Tab {...item} key={(item as { key: string }).key} />}
    </Tabs>
  );
}

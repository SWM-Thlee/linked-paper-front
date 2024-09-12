import { Settings } from "@/ui/settings";
import SearchFilterEditorContainer from "@/features/search/components/filter-settings/editor-container";
import SearchQuery from "./search-query";

type Props = {
  children: React.ReactNode;
};

// TODO: Search Query 설정에서도 Default Filter 설정할 수 있도록 하기
// TODO: Default Filter와 Query 연동시키기
export default function FilterSettings({ children }: Props) {
  return (
    <Settings.Root>
      <Settings.Trigger>{children}</Settings.Trigger>
      <Settings.Content>
        <SearchQuery />
        <SearchFilterEditorContainer />
      </Settings.Content>
    </Settings.Root>
  );
}

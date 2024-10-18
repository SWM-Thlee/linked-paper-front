import { Settings } from "@/ui/settings";
import SearchFilterEditorContainer from "@/features/search/components/filter-settings/editor-container";
import SearchQuerySettings from "./search-query-settings";

type Props = {
  children: React.ReactNode;
};

export default function FilterSettings({ children }: Props) {
  return (
    <Settings.Root>
      <Settings.Trigger>{children}</Settings.Trigger>
      <Settings.Content>
        <SearchQuerySettings />
        <SearchFilterEditorContainer />
      </Settings.Content>
    </Settings.Root>
  );
}

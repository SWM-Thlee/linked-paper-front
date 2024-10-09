import SearchFilterEditorContainer from "@/features/search/components/filter-settings/editor-container";
import { Settings } from "@/ui/settings";
import { Filter } from "@/features/filter/types";
import DefaultSearchFilter from "./default-search-filter";

type Props = {
  children: React.ReactNode;
};

export default function FilterSettings({ children }: Props) {
  return (
    <Settings.Root>
      <Settings.Trigger>{children}</Settings.Trigger>
      <Settings.Content>
        <DefaultSearchFilter />
        <SearchFilterEditorContainer
          track={{ tag: [Filter.Identify.Tag.DEFAULT] }}
        />
        <SearchFilterEditorContainer
          track={{ tag: [Filter.Identify.Tag.PRESET] }}
        />
      </Settings.Content>
    </Settings.Root>
  );
}

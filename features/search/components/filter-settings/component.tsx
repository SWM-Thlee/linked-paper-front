import { Settings } from "@/ui/settings";
import SearchFilterEditorContainer from "./editor-container";
import SearchQuery from "./tabs/search-query";

type Props = {
  children: React.ReactNode;
};

export default function SearchFilterSettings({ children }: Props) {
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

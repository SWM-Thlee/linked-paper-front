import Settings from "@/ui/settings";
import QueryFilterTab from "./tabs/query-filter";
import FiltersTab from "./tabs/filters";

type Props = {
  children: React.ReactNode;
};

export default function FilterSettings({ children }: Props) {
  return (
    <Settings.Root>
      <Settings.AriaInfo />
      <Settings.Trigger>{children}</Settings.Trigger>
      <Settings.Content>
        <QueryFilterTab />
        <FiltersTab />
      </Settings.Content>
    </Settings.Root>
  );
}

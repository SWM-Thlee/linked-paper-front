import Settings from "@/ui/settings";
import DefaultFilterTab from "./tabs/default-filter";
import PresetFiltersTab from "./tabs/preset-filters";

type Props = {
  children: React.ReactNode;
};

export default function FilterSettings({ children }: Props) {
  return (
    <Settings.Root>
      <Settings.AriaInfo />
      <Settings.Trigger>{children}</Settings.Trigger>
      <Settings.Content>
        <DefaultFilterTab />
        <PresetFiltersTab />
      </Settings.Content>
    </Settings.Root>
  );
}

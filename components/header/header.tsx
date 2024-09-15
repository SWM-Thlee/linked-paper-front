import Navigation from "./navigation";
import HeaderTitle from "./title";
import { HeaderSettings } from "./settings";

export default function Header() {
  return (
    <header className="sticky top-0 z-header flex w-[1024px] items-center justify-between bg-light-surfaceContainer/90 py-6 dark:bg-dark-surfaceContainer/90">
      <HeaderTitle />
      <Navigation />
      <HeaderSettings />
    </header>
  );
}

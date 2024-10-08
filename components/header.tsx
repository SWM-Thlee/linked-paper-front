import Navigation from "./navigation";
import HeaderTitle from "./header-title";
import HeaderSettings from "./header-settings";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 items-center self-stretch bg-light-surfaceContainer/90 px-[10%] py-6 dark:bg-dark-surfaceContainer/90">
      <HeaderTitle />
      <Navigation />
      <HeaderSettings />
    </header>
  );
}

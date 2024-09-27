import ThemeSwitcher from "./theme-switcher";

export default function HeaderSettings() {
  return (
    <div className="z-header flex justify-end gap-2">
      <ThemeSwitcher />
    </div>
  );
}

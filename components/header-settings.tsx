import ThemeSwitcher from "./theme-switcher";

export default function HeaderSettings() {
  return (
    <div className="flex flex-row justify-end gap-6">
      <ThemeSwitcher />
    </div>
  );
}

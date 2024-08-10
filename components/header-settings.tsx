import ThemeSwitcher from "./theme-switcher";

export default function HeaderSettings() {
  return (
    <div className="z-10 flex justify-end gap-6">
      <ThemeSwitcher />
    </div>
  );
}

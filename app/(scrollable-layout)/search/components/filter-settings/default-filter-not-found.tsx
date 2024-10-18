import TipIcon from "@/ui/icons/tip";

export default function DefaultFilterNotFound() {
  return (
    <div className="flex flex-col gap-6 rounded-4 p-6 text-body-large ring-2 ring-inset ring-light-outlineVariant dark:ring-dark-outlineVariant">
      <TipIcon ui_size="large" />
      <div className="text-title-large">Default Filter is Not Set</div>
      <p>
        Save time by setting up a Default Filter for faster, more accurate
        search results.
      </p>
    </div>
  );
}

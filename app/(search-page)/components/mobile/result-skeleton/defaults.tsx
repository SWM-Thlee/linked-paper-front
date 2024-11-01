export function Spliter() {
  return (
    <hr className="border-light-outlineVariant dark:border-dark-outlineVariant" />
  );
}

export function SpliterLoading() {
  return (
    <hr className="animate-pulse border-light-outlineVariant dark:border-dark-outlineVariant" />
  );
}

export function ItemLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="h-[5rem] w-full rounded-4 bg-light-surfaceContainerHighest dark:bg-dark-surfaceContainerHighest" />
        <div className="h-[4rem] w-full rounded-4 bg-light-surfaceContainerHighest/50 dark:bg-dark-surfaceContainerHighest/50" />
      </div>
      <div className="h-[8rem] w-full rounded-4 bg-light-surfaceContainerHighest/50 dark:bg-dark-surfaceContainerHighest/50" />
      <div className="flex gap-4">
        <div className="h-[2.25rem] flex-1 rounded-circle bg-light-primaryContainer/50 dark:bg-dark-primaryContainer/50" />
        <div className="flex flex-1 gap-4">
          <div className="h-[2.25rem] flex-1 rounded-circle bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
          <div className="h-[2.25rem] flex-1 rounded-circle bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
        </div>
      </div>
    </div>
  );
}

export function InitialLoading() {
  return (
    <div className="flex flex-1 flex-col gap-8 bg-light-surfaceBright/15 px-8 pt-8 dark:bg-dark-surfaceBright/15">
      <SpliterLoading />
      <ItemLoading />
      <SpliterLoading />
      <ItemLoading />
      <SpliterLoading />
      <ItemLoading />
      <SpliterLoading />
      <ItemLoading />
    </div>
  );
}

export function EndlessFooter() {
  return (
    <div className="bg-gradient-to-b from-light-surfaceBright/15 to-light-surfaceContainer px-6 pb-6 dark:from-dark-surfaceBright/15 dark:to-dark-surfaceContainer" />
  );
}

export function NextLoading() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-6 bg-light-surfaceBright/15 px-6 pt-6 dark:bg-dark-surfaceBright/15">
        <SpliterLoading />
        <ItemLoading />
      </div>
      <EndlessFooter />
    </>
  );
}

export function EndOfPage() {
  return (
    <div className="gap-6 rounded-b-4 bg-light-surfaceBright/15 p-6 dark:bg-dark-surfaceBright/15">
      <div className="select-none text-center text-title-medium text-light-onSurface dark:text-dark-onSurface">
        End Of Page
      </div>
    </div>
  );
}

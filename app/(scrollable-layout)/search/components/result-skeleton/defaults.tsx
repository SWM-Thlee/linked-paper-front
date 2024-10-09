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
    <div className="grid animate-pulse grid-cols-[auto_8rem] gap-8">
      <div className="flex flex-1 flex-col gap-8">
        <div className="h-[4rem] w-[75%] rounded-4 bg-light-surfaceContainerHighest dark:bg-dark-surfaceContainerHighest" />
        <div className="flex flex-wrap gap-2">
          <div className="h-[2rem] w-[30rem] rounded-circle bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
        </div>
        <div className="h-[4.5rem] w-full rounded-4 bg-light-surfaceContainerHighest dark:bg-dark-surfaceContainerHighest" />
      </div>
      <div className="flex flex-col items-stretch justify-end gap-2">
        <div className="h-[2.25rem] w-[8rem] rounded-circle bg-light-secondaryContainer dark:bg-dark-secondaryContainer" />
        <div className="h-[2.25rem] w-[8rem] rounded-circle bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
        <div className="h-[2.25rem] w-[8rem] rounded-circle bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
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
    <div className="bg-gradient-to-b from-light-surfaceBright/15 to-light-surfaceContainer px-8 pb-8 dark:from-dark-surfaceBright/15 dark:to-dark-surfaceContainer" />
  );
}

export function NextLoading() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-8 bg-light-surfaceBright/15 px-8 pt-8 dark:bg-dark-surfaceBright/15">
        <SpliterLoading />
        <ItemLoading />
      </div>
      <EndlessFooter />
    </>
  );
}

export function EndOfPage() {
  return (
    <div className="gap-8 rounded-b-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <div className="select-none text-center text-title-medium text-light-onSurface dark:text-dark-onSurface">
        End Of Page
      </div>
    </div>
  );
}

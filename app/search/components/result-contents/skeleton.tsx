function ItemSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-[auto_12rem] gap-8">
      <div className="flex flex-1 flex-col gap-8">
        <div className="h-[4rem] w-[75%] rounded-4 bg-light-surfaceContainerHighest dark:bg-dark-surfaceContainerHighest" />
        <div className="flex flex-wrap gap-2">
          <div className="h-[2rem] w-[30rem] rounded-circle bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
        </div>
        <div className="h-[4.5rem] w-full rounded-4 bg-light-surfaceContainerHighest dark:bg-dark-surfaceContainerHighest" />
      </div>
      <div className="flex flex-col items-stretch justify-end gap-2">
        <div className="h-[2.25rem] w-[12rem] rounded-2 bg-light-secondaryContainer dark:bg-dark-secondaryContainer" />
        <div className="h-[2.25rem] w-[12rem] rounded-2 bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
        <div className="h-[2.25rem] w-[12rem] rounded-2 bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50" />
      </div>
    </div>
  );
}

function SpliterSkeleton() {
  return (
    <hr className="animate-pulse border-light-outlineVariant dark:border-dark-outlineVariant" />
  );
}

export default function SearchResultSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-8 rounded-b-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <ItemSkeleton />
      <SpliterSkeleton />
      <ItemSkeleton />
      <SpliterSkeleton />
      <ItemSkeleton />
      <SpliterSkeleton />
      <ItemSkeleton />
    </div>
  );
}

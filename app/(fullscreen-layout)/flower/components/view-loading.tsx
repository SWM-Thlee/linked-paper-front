export default function ViewLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-light-onSurface">
      <div className="h-[36rem] w-[36rem] animate-pulse rounded-circle bg-light-primary/25 duration-500 dark:bg-dark-primary/25" />
    </div>
  );
}

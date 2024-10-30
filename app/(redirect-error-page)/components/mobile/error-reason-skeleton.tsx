export default function MobileErrorReasonSkeleton() {
  return (
    <>
      <div className="select-none text-headline-small">
        <span>From - </span>
        <span className="h-[2.75rem] w-[15rem] animate-pulse rounded-4 bg-light-secondary dark:bg-dark-secondary" />
      </div>
      <div className="select-none text-headline-small">
        <span>Because of - </span>
        <span className="h-[2.75rem] w-[15rem] animate-pulse rounded-4 bg-light-secondary dark:bg-dark-secondary" />
      </div>
    </>
  );
}

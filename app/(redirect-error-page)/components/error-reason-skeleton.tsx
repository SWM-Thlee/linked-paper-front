export default function ErrorReasonSkeleton() {
  return (
    <>
      <div className="select-none text-headline-small">
        <span>From - </span>
        <span className="h-[2.75rem] w-[30rem] animate-pulse rounded-4 bg-light-secondary dark:bg-dark-secondary" />
      </div>
      <div className="select-none text-headline-small">
        <span>Because of - </span>
        <span className="h-[2.75rem] w-[30rem] animate-pulse rounded-4 bg-light-secondary dark:bg-dark-secondary" />
      </div>
    </>
  );
}

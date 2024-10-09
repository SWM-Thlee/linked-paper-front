export function KeyContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 text-body-large">{children}</div>
  );
}

export function ContentContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col items-start gap-2 text-body-large">
      {children}
    </div>
  );
}

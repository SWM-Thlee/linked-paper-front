export default function ScrollableLayout({
  children,
  aside,
  footer,
}: {
  children?: React.ReactNode;
  aside: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mt-32 grid auto-rows-auto grid-cols-[1fr_auto_1fr] gap-16">
      <div className="col-[2_/_3] row-[2_/_3]">{children}</div>
      <div className="col-[3_/_4] row-[1_/_3]">{aside}</div>
      <div className="col-[1_/_4] row-[3_/_4]">{footer}</div>
    </div>
  );
}

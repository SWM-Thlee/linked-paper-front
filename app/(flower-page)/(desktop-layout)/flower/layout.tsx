export default function FullscreenLayout({
  children,
  header,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      {header}
      {children}
    </div>
  );
}

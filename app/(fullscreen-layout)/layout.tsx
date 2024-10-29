import SimpleHeader from "@/components/simple-header";

export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <div className="fixed left-[2rem] top-[2rem] z-header">
        <SimpleHeader />
      </div>
      {children}
    </div>
  );
}

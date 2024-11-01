import Footer from "@/components/footer";

export default function MainPageMobileLayout({
  children,
  header,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
}) {
  return (
    <div className="mt-32 flex min-h-screen flex-col justify-between gap-8">
      {header}
      {children}
      <Footer />
    </div>
  );
}

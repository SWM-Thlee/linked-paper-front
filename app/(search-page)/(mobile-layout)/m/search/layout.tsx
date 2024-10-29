import Footer from "@/components/footer";

export default function MainPageMobileLayout({
  children,
  header,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
}) {
  return (
    <div className="mt-32 flex flex-col gap-8">
      {header}
      {children}
      <Footer />
    </div>
  );
}

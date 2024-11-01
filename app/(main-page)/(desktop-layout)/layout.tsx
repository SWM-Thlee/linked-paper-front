import Footer from "@/components/footer";

export default function MainPageDesktopLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-24 grid auto-rows-auto grid-cols-[1fr_auto_1fr] gap-16">
      <div className="col-[2_/_3] row-[2_/_3]">{children}</div>
      <div className="col-[1_/_4] row-[3_/_4]">
        <Footer />
      </div>
    </div>
  );
}

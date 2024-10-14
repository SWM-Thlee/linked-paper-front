type Props = {
  children?: React.ReactNode;
};

export default function SidebarWrapper({ children }: Props) {
  return (
    <div className="pointer-events-none fixed right-0 top-[50%] z-dialog w-[40vw] -translate-y-[50%] p-[2rem]">
      <div className="relative flex flex-col items-stretch justify-center gap-[2rem]">
        {children}
      </div>
    </div>
  );
}

type Props = {
  children?: React.ReactNode;
};

export default function ToolbarWrapper({ children }: Props) {
  return (
    <div className="pointer-events-none fixed bottom-0 z-dialog w-screen p-[2rem]">
      <div className="relative flex justify-between">{children}</div>
    </div>
  );
}

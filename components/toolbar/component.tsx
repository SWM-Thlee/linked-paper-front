import { TooltipProvider } from "@/ui/tooltip";

type Props = {
  children?: React.ReactNode;
};

export default function Toolbar({ children }: Props) {
  return (
    <TooltipProvider>
      <div className="pointer-events-none fixed bottom-0 left-0 z-toolbar w-screen p-[2rem]">
        <div className="relative flex items-center gap-2">{children}</div>
      </div>
    </TooltipProvider>
  );
}

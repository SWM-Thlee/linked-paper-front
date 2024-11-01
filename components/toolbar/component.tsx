import { TooltipProvider } from "@/ui/tooltip";
import { cn } from "@/utils/style/tailwind-variants";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Toolbar({ children, className }: Props) {
  return (
    <TooltipProvider>
      <div className="pointer-events-none fixed bottom-0 left-0 z-toolbar w-screen p-[2rem]">
        <div
          className={cn(
            "relative flex w-full flex-wrap items-center gap-2",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}

import Link from "next/link";
import { HStack, VStack } from "@/components/stactk";

function StyledText({ children }: { children: React.ReactNode }) {
  return <span className="text-headline-large">{children}</span>;
}

export default function Footer() {
  return (
    <footer className="self-stretch bg-light-surfaceDim px-[10%] py-12 dark:bg-dark-surfaceDim">
      <HStack className="items-center justify-between self-stretch">
        <VStack className="gap-2">
          {/* StyledText를 적절한 네이밍의 Component로 규격화해서 관리할 수 있겠죠? 예를 들면, Body2 같은 네이밍으로요 */}
          <StyledText>Team Thlee</StyledText>
          <span>Software Maestro 15th - 2024</span>
        </VStack>
        <VStack className="items-end gap-2">
          <Link href="https://github.com/SWM-Thlee">Github</Link>
          <Link href="mailto:cutehammond772@gmail.com">Contact Us</Link>
        </VStack>
      </HStack>
    </footer>
  );
}

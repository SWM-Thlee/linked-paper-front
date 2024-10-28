import Link from "next/link";
import Image from "next/image";

import { tv } from "@/utils/style/tailwind-variants";
import { Navigation } from "@/ui/navigation";
import ThemeSwitcher from "../theme-switcher";
import modules from "./modules";

export const headerVariant = tv({
  slots: {
    wrapper: [
      "relative w-[1024px]",
      "flex items-center justify-center",
      "z-header",
      "transition-[padding] duration-300",
    ],
    container: [
      "pointer-events-auto w-full p-6",
      "flex items-center justify-between",
      "transition-[border,_box-shadow,_padding,_border-radius] duration-300",
      "ring-light-surfaceContainer/90 bg-light-surfaceContainer/90",
      "dark:ring-dark-surfaceContainer/50 dark:bg-dark-surfaceContainer/50",
    ],
    header: [
      "text-nowrap select-none z-10",
      "text-headline-small leading-none",
      "flex items-center gap-4",
      "transition-[font-size,_line-height] duration-300",
      "text-light-onSurface dark:text-dark-onSurface",
    ],
    navigation: [
      "absolute top-0 left-0 w-full h-full",
      "flex items-center justify-center",
    ],
    content: ["z-10", "flex items-center justify-end gap-2"],
  },
});

export default function Header() {
  const { wrapper, container, header, navigation, content } = headerVariant();

  return (
    <header className="pointer-events-none fixed top-0 z-header flex w-full justify-center">
      <div className={wrapper()}>
        <div className={container()}>
          {/* Title */}
          <Link href="/" className={header()}>
            <Image
              src="./logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="animate-fadeIn dark:hidden"
            />
            <Image
              src="./logo-dark.svg"
              alt="Logo"
              width={32}
              height={32}
              className="hidden animate-fadeIn dark:block"
            />
            Linked Paper
          </Link>
          {/* Navigation */}
          <nav className={navigation()}>
            <Navigation ui_color="primary" modules={modules} />
          </nav>
          {/* Content */}
          <div className={content()}>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

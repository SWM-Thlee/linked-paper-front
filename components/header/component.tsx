"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import Link from "next/link";

import { tv } from "@/utils/tailwind-variants";
import { Navigation } from "@/ui/navigation";
import ThemeSwitcher from "./settings/theme-switcher";
import modules from "./modules";
import { HeaderMode, headerModeAtom } from "./store";

export const headerVariant = tv({
  slots: {
    wrapper: [
      "relative",
      "w-[1024px]",
      "flex items-center justify-center",
      "z-header",
      "transition-[padding] duration-300",
    ],
    container: [
      "flex items-center justify-between",
      "transition-[border,_box-shadow,_padding,_border-radius] duration-300",
      "w-full",
      "p-6",
      "ring-light-surfaceContainer/90",
      "bg-light-surfaceContainer/90",
      "dark:ring-dark-surfaceContainer/50",
      "dark:bg-dark-surfaceContainer/50",
    ],
    header: [
      "text-nowrap",
      "select-none",
      "z-10",
      "text-headline-medium",
      "transition-[font-size,_line-height] duration-300",
      "text-light-onSurface",
      "dark:text-dark-onSurface",
    ],
    navigation: [
      "absolute top-0 left-0",
      "flex items-center justify-center",
      "w-full",
      "h-full",
    ],
    content: ["z-10", "flex items-center justify-end", "gap-2"],
  },
  variants: {
    internal_ui_variant: {
      default: {},
      floating: {
        wrapper: ["p-6"],
        header: ["text-headline-small"],
        container: [
          "rounded-4",
          "py-4",
          "ring-inset ring-2",
          "ring-light-outlineVariant",
          "dark:ring-dark-outlineVariant",
        ],
      },
    },
  },
  defaultVariants: {
    internal_ui_variant: "default",
  },
});

export default function Header() {
  const headerMode = useAtomValue(headerModeAtom);
  const [currentMode, setCurrentMode] = useState<HeaderMode>(
    HeaderMode.DEFAULT,
  );
  const { wrapper, container, header, navigation, content } = headerVariant({
    internal_ui_variant: currentMode,
  });

  useEffect(() => {
    setCurrentMode(headerMode);
  }, [headerMode]);

  return (
    <header className="fixed top-0 z-header flex w-full justify-center">
      <div className={wrapper()}>
        <div className={container()}>
          {/* Title */}
          <Link href="/" className={header()}>
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

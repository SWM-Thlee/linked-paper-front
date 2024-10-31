import Image from "next/image";
import Link from "next/link";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import ThemeSwitcher from "./theme-switcher";

export const mobileHeaderVariant = tv({
  slots: {
    wrapper: ["absolute left-0 top-0 z-header w-screen"],
    container: ["flex items-center justify-between gap-4 px-8 py-6"],
    title: ["mb-1 text-nowrap text-headline-small"],
  },
  variants: {
    ui_variant: {
      default: {
        wrapper: [
          "bg-light-surfaceContainer/50 dark:bg-dark-surfaceContainer/50",
        ],
      },
      flower: {
        title: ["hidden"],
      },
    },
  },
  defaultVariants: {
    ui_variant: "default",
  },
});

export type MobileHeaderProps = VariantProps<typeof mobileHeaderVariant>;

export default function MobileHeader({ ui_variant }: MobileHeaderProps) {
  const { wrapper, container, title } = mobileHeaderVariant({ ui_variant });
  const endpoint =
    process.env.NEXT_PUBLIC_DEV_ENDPOINT ?? "https://linked-paper.com";

  return (
    <header className={wrapper()}>
      <div className={container()}>
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={`${endpoint}/logo.svg`}
            alt="Logo"
            width={32}
            height={32}
            priority
            className="animate-fadeIn dark:hidden"
          />
          <Image
            src={`${endpoint}/logo-dark.svg`}
            alt="Logo"
            width={32}
            height={32}
            priority
            className="hidden animate-fadeIn dark:block"
          />
          <div className={title()}>Linked Paper</div>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";

import ThemeSwitcher from "./theme-switcher";

export default function FlowerHeader() {
  return (
    <div className="fixed left-[2rem] top-[2rem] z-header">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="./logo.svg"
              alt="Logo"
              width={32}
              height={32}
              priority
              className="animate-fadeIn dark:hidden"
            />
            <Image
              src="./logo-dark.svg"
              alt="Logo"
              width={32}
              height={32}
              priority
              className="hidden animate-fadeIn dark:block"
            />
            <div className="mb-[0.125rem] select-none text-headline-small text-light-onSurface dark:text-dark-onSurface">
              Linked Paper
            </div>
          </div>
        </Link>
        <div className="h-[2rem] w-[1px] rounded-circle bg-light-onSurface/25 dark:bg-dark-onSurface/25" />
        <ThemeSwitcher />
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

export default function MobileHeader() {
  const endpoint =
    process.env.NEXT_PUBLIC_DEV_ENDPOINT ?? "https://linked-paper.com";

  return (
    <header className="absolute left-0 top-0 z-header w-screen">
      <div className="flex items-center justify-between gap-4 bg-light-surfaceContainer/50 px-8 py-6 dark:bg-dark-surfaceContainer/50">
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
          <div className="mb-1 text-nowrap text-headline-small">
            Linked Paper
          </div>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

export default function SimpleHeader() {
  return (
    <div className="flex items-center gap-4 rounded-circle p-2">
      <Link href="/">
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
      </Link>
      <div className="opacity-25 transition-opacity hover:opacity-100">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-between self-stretch bg-light-surfaceDim px-[10%] py-12 dark:bg-dark-surfaceDim">
      <div className="flex flex-col gap-2">
        <span className="text-headline-large">Team Thlee</span>
        <span>Software Maestro 15th - 2024</span>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Link className="" href="https://github.com/SWM-Thlee">
          Github
        </Link>
        <Link className="" href="mailto:cutehammond772@gmail.com">
          Contact Us
        </Link>
      </div>
    </footer>
  );
}

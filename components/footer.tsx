import Link from "next/link";

const CONTACT_MAIL = process.env.NEXT_PUBLIC_FEEDBACK_MAIL;

export default function Footer() {
  return (
    <footer className="flex items-center justify-between self-stretch bg-light-surfaceDim px-[10%] py-12 dark:bg-dark-surfaceDim">
      <div className="flex flex-col gap-2">
        <span className="text-headline-large">Team Thlee</span>
        <span>Software Maestro 15th - 2024</span>
      </div>
      <div className="flex flex-col items-end gap-2">
        {CONTACT_MAIL && (
          <Link href={`mailto:${CONTACT_MAIL}`}>Contact Us</Link>
        )}
      </div>
    </footer>
  );
}

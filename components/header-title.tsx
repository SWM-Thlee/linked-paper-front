import Link from "next/link";

type Props = { title?: string };

export default function HeaderTitle({ title = "Linked Paper" }: Props) {
  return (
    <Link
      href="/"
      className="z-10 text-nowrap text-headline-large text-light-onSurface dark:text-dark-onSurface"
    >
      {title}
    </Link>
  );
}

type Props = { title?: string };

export default function HeaderTitle({ title = "Linked Paper" }: Props) {
  return (
    <span className="text-nowrap text-headline-large text-light-onSurface dark:text-dark-onSurface">
      {title}
    </span>
  );
}

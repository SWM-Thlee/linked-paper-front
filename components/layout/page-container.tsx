type Props = React.PropsWithChildren;

export default function PageContainer({ children }: Props) {
  return (
    <main className="flex min-h-[1440px] w-[1024px] flex-col">{children}</main>
  );
}

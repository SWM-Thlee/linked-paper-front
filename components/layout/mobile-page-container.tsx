type Props = React.PropsWithChildren;

export default function MobilePageContainer({ children }: Props) {
  return (
    <main className="flex min-h-[720px] w-screen flex-col">{children}</main>
  );
}

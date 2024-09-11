import * as Primitive from "@radix-ui/react-visually-hidden";

export interface VisuallyHiddenProps extends Primitive.VisuallyHiddenProps {}

export default function VisuallyHidden({
  children,
  ...props
}: VisuallyHiddenProps) {
  return <Primitive.Root {...props}>{children}</Primitive.Root>;
}

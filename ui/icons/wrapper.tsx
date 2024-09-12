import { IconType } from "react-icons";
import { tv, VariantProps } from "@/utils/tailwind-variants";

export const iconVariant = tv({
  variants: {
    _size: {
      small: 16,
      medium: 20,
      large: 32,
      exlarge: 40,
    },
  },
  defaultVariants: {
    _size: "medium",
  },
});

interface IconProfile<
  T extends string,
  U extends ((props: object) => JSX.Element) | (() => JSX.Element),
> {
  type: T;
  baseComponent: U;
  defaultProps?: Parameters<U>[0] & VariantProps<typeof iconVariant>;
}

interface ReactIconsProfile extends IconProfile<"react-icons", IconType> {}

export default function IconWrapper({
  baseComponent: Icon,
  defaultProps,
}: ReactIconsProfile) {
  return function IconWithVariant({
    _size,
    ...props
  }: NonNullable<typeof defaultProps>) {
    return <Icon size={iconVariant({ _size })} {...defaultProps} {...props} />;
  };
}

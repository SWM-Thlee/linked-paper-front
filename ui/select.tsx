import { tv, VariantProps } from "@/utils/tailwind-variants";
import * as UiRadioGroup from "@radix-ui/react-radio-group";

export const selectVariant = tv({
  slots: {
    container: ["inline-flex", "p-1", "gap-1", "rounded-full"],
    button: ["rounded-full", "transition-colors", "select-none"],
  },
  variants: {
    _color: {
      primary: [],
      secondary: [],
      tertiary: [],
    },
    _variant: {
      default: [],
      bordered: {
        container: ["ring-inset", "ring-2"],
      },
    },
    _size: {
      large: {
        button: ["px-6", "py-2", "text-label-large"],
      },
      medium: {
        button: ["px-4", "py-1.5", "text-label-large"],
      },
      small: {
        button: ["px-3", "py-1", "text-label-medium"],
      },
    },
  },
  compoundVariants: [
    {
      _color: "primary",
      _variant: "default",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onPrimaryContainer",
          "data-[state=checked]:bg-light-primary",
          "data-[state=checked]:text-light-onPrimary",
          "dark:data-[state=unchecked]:text-dark-onPrimaryContainer",
          "dark:data-[state=checked]:bg-dark-primary",
          "dark:data-[state=checked]:text-dark-onPrimary",
        ],
        container: [
          "bg-light-primaryContainer/50",
          "dark:bg-dark-primaryContainer/50",
        ],
      },
    },
    {
      _color: "primary",
      _variant: "bordered",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onPrimaryContainer",
          "data-[state=checked]:bg-light-primary",
          "data-[state=checked]:text-light-onPrimary",
          "dark:data-[state=unchecked]:text-dark-onPrimaryContainer",
          "dark:data-[state=checked]:bg-dark-primary",
          "dark:data-[state=checked]:text-dark-onPrimary",
        ],
        container: ["ring-light-primary/50", "dark:ring-dark-primary/50"],
      },
    },
    {
      _color: "secondary",
      _variant: "default",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onSecondaryContainer",
          "data-[state=checked]:bg-light-secondary",
          "data-[state=checked]:text-light-onSecondary",
          "dark:data-[state=unchecked]:text-dark-onPrimaryContainer",
          "dark:data-[state=checked]:bg-dark-secondary",
          "dark:data-[state=checked]:text-dark-onSecondary",
        ],
        container: [
          "bg-light-secondaryContainer/50",
          "dark:bg-dark-secondaryContainer/50",
        ],
      },
    },
    {
      _color: "secondary",
      _variant: "bordered",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onSecondaryContainer",
          "data-[state=checked]:bg-light-secondary",
          "data-[state=checked]:text-light-onSecondary",
          "dark:data-[state=unchecked]:text-dark-onSecondaryContainer",
          "dark:data-[state=checked]:bg-dark-secondary",
          "dark:data-[state=checked]:text-dark-onSecondary",
        ],
        container: ["ring-light-secondary/50", "dark:ring-dark-secondary/50"],
      },
    },
    {
      _color: "tertiary",
      _variant: "default",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onTertiaryContainer",
          "data-[state=checked]:bg-light-tertiary",
          "data-[state=checked]:text-light-onTertiary",
          "dark:data-[state=unchecked]:text-dark-onTertiaryContainer",
          "dark:data-[state=checked]:bg-dark-tertiary",
          "dark:data-[state=checked]:text-dark-onTertiary",
        ],
        container: [
          "bg-light-tertiaryContainer/50",
          "dark:bg-dark-tertiaryContainer/50",
        ],
      },
    },
    {
      _color: "tertiary",
      _variant: "bordered",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onTertiaryContainer",
          "data-[state=checked]:bg-light-tertiary",
          "data-[state=checked]:text-light-onTertiary",
          "dark:data-[state=unchecked]:text-dark-onTertiaryContainer",
          "dark:data-[state=checked]:bg-dark-tertiary",
          "dark:data-[state=checked]:text-dark-onTertiary",
        ],
        container: ["ring-light-tertiary/50", "dark:ring-dark-tertiary/50"],
      },
    },
  ],
  defaultVariants: {
    _color: "primary",
    _variant: "default",
    _size: "medium",
  },
});

type Item = { value: string; id: string; content?: React.ReactNode };
type Props = { items: Item[] } & VariantProps<typeof selectVariant> &
  UiRadioGroup.RadioGroupProps;

// TODO: form input 대응
export default function Select({
  _color,
  _size,
  _variant,
  items,
  className,
  ...props
}: Props) {
  const { button, container } = selectVariant({ _color, _size, _variant });

  return (
    <UiRadioGroup.Root className={container()} {...props}>
      {items.map(({ id, value }) => (
        <UiRadioGroup.Item key={id} value={value} id={id} className={button()}>
          <div>{value}</div>
        </UiRadioGroup.Item>
      ))}
    </UiRadioGroup.Root>
  );
}

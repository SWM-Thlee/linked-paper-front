import { tv, VariantProps } from "@/utils/tailwind-variants";
import { forwardRef } from "react";
import { MdSearch as SearchIcon } from "react-icons/md";

export const searchVariant = tv({
  slots: {
    container: [
      "transition-colors",
      "flex",
      "flex-nowrap",
      "items-center",
      "gap-4",
    ],
    input: ["transition-colors", "border-none", "outline-none", "flex-1"],
    icon: [],
  },
  variants: {
    _color: {
      primary: {
        container: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
        ],
        input: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
          "placeholder:text-light-onPrimaryContainer/25",
          "dark:placeholder:text-dark-onPrimaryContainer/25",
        ],
      },
      secondary: {
        container: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
        input: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
          "placeholder:text-light-onSecondaryContainer/25",
          "dark:placeholder:text-dark-onSecondaryContainer/25",
        ],
      },
      tertairy: {
        container: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
        ],
        input: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
          "placeholder:text-light-onTertiaryContainer/25",
          "dark:placeholder:text-dark-onTertiaryContainer/25",
        ],
      },
    },
    _size: {
      large: {
        container: ["rounded-[1.25rem]", "px-6", "py-3"],
        input: ["text-title-large"],
        icon: ["w-[22px]", "h-[22px]"],
      },
      medium: {
        container: ["rounded-[1rem]", "px-4", "py-2"],
        input: ["text-title-medium"],
        icon: ["w-[16px]", "h-[16px]"],
      },
      small: {
        container: ["rounded-[0.75rem]", "px-2", "py-1"],
        input: ["text-title-small"],
        icon: ["w-[14px]", "h-[14px]"],
      },
    },
  },
  defaultVariants: {
    _color: "primary",
    _size: "large",
  },
});

type Props = VariantProps<typeof searchVariant> &
  React.ComponentPropsWithoutRef<"input">;

const Search = forwardRef<HTMLInputElement, Props>(
  ({ _color, _size, type, placeholder, className, key, ...props }, ref) => {
    const { container, input, icon } = searchVariant({ _color, _size });

    return (
      <div key={key} className={container()}>
        <input
          ref={ref}
          type={type ?? "text"}
          placeholder={placeholder ?? "Search Something..."}
          className={input()}
          {...props}
        />
        <SearchIcon className={icon()} />
      </div>
    );
  },
);

Search.displayName = "Search";

export default Search;

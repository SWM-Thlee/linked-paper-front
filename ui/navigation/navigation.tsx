"use client";

import React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { tv, VariantProps } from "@/utils/tailwind-variants";
import { NavigationModule } from "./types";

export const navigationVariant = tv({
  slots: {
    root: ["flex", "w-screen", "justify-center"],
    list: [
      "flex",
      "p-1",
      "gap-1",
      "list-none",
      "rounded-full",
      "bg-light-surfaceDim",
      "dark:bg-dark-surfaceDim",
    ],
    button: ["rounded-full", "transition-colors", "block", "select-none"],
    content: [
      "data-[motion=from-start]:animate-enterFromLeft",
      "data-[motion=from-end]:animate-enterFromRight",
      "data-[motion=to-start]:animate-exitToLeft",
      "data-[motion=to-end]:animate-exitToRight",
      "absolute",
      "left-0",
      "top-0",
      "min-w-[1024px]",
      "max-w-[60%]",
      "sm:w-auto",
      "text-light-onSurface",
      "dark:text-dark-onSurface",
    ],
    viewport: [
      "data-[state=open]:animate-scaleIn",
      "data-[state=closed]:animate-scaleOut",
      "relative",
      "mt-[-14px]",
      "h-[var(--radix-navigation-menu-viewport-height)]",
      "w-full",
      "origin-[top_center]",
      "overflow-hidden",
      "shadow-md",
      "transition-[width,_height]",
      "duration-300",
      "sm:w-[var(--radix-navigation-menu-viewport-width)]",
      "bg-light-surfaceContainerLow",
      "dark:bg-dark-surfaceContainerLow",
    ],
    viewportWrapper: [
      "perspective-[2000px]",
      "absolute",
      "left-0",
      "top-full",
      "flex",
      "w-full",
      "justify-center",
    ],
  },
  variants: {
    _color: {
      none: {
        button: ["text-light-onSurface", "dark:text-dark-onSurface"],
      },
      primary: {
        button: [
          "bg-light-primary",
          "text-light-onPrimary",
          "dark:bg-dark-primary",
          "dark:text-dark-onPrimary",
          "hover:bg-light-primary/75",
          "hover:text-light-onPrimary/75",
          "dark:hover:bg-dark-primary/75",
          "dark:hover:text-dark-onPrimary/75",
          "data-[state=open]:bg-light-primary/75",
          "data-[state=open]:text-light-onPrimary/75",
          "dark:data-[state=open]:bg-dark-primary/75",
          "dark:data-[state=open]:text-dark-onPrimary/75",
        ],
      },
      secondary: {
        button: [
          "bg-light-secondary",
          "text-light-onSecondary",
          "dark:bg-dark-secondary",
          "dark:text-dark-onSecondary",
          "hover:bg-light-secondary/75",
          "hover:text-light-onSecondary/75",
          "dark:hover:bg-dark-secondary/75",
          "dark:hover:text-dark-onSecondary/75",
          "data-[state=open]:bg-light-secondary/75",
          "data-[state=open]:text-light-onSecondary/75",
          "dark:data-[state=open]:bg-dark-secondary/75",
          "dark:data-[state=open]:text-dark-onSecondary/75",
        ],
      },
      tertiary: {
        button: [
          "bg-light-tertiary",
          "text-light-onTertiary",
          "dark:bg-dark-tertiary",
          "dark:text-dark-onTertiary",
          "hover:bg-light-tertiary/75",
          "hover:text-light-onTertiary/75",
          "dark:hover:bg-dark-tertiary/75",
          "dark:hover:text-dark-onTertiary/75",
          "data-[state=open]:bg-light-tertiary/75",
          "data-[state=open]:text-light-onTertiary/75",
          "dark:data-[state=open]:bg-dark-tertiary/75",
          "dark:data-[state=open]:text-dark-onTertiary/75",
        ],
      },
    },
    _size: {
      large: {
        button: ["px-6", "py-2"],
        content: ["p-8"],
        viewport: ["rounded-ex-large"],
      },
      medium: {
        button: ["px-4", "py-1.5"],
        content: ["p-8"],
        viewport: ["rounded-large"],
      },
      small: {
        button: ["px-3", "py-1"],
        content: ["p-6"],
        viewport: ["rounded-medium"],
      },
    },
  },
  defaultVariants: {
    _color: "none",
    _size: "medium",
  },
});

type Props = {
  modules: NavigationModule[];
} & VariantProps<typeof navigationVariant>;

export default function Navigation({
  modules,
  _color: accentColor,
  _size,
}: Props) {
  const { root, list, button, content, viewport, viewportWrapper } =
    navigationVariant({ _color: accentColor, _size });

  return (
    <NavigationMenu.Root delayDuration={0} className={root()}>
      <NavigationMenu.List className={list()}>
        {modules.map((module) => (
          <NavigationMenu.Item key={module.key}>
            {module.type === "dropdown" ? (
              <>
                <NavigationMenu.Trigger
                  className={button({
                    _color: accentColor,
                  })}
                >
                  {module.title}
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={content()}>
                  {module.content}
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link asChild>
                <Link
                  className={button({
                    _color: accentColor,
                  })}
                  href={module.href}
                >
                  {module.title}
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <div className={viewportWrapper()}>
        <NavigationMenu.Viewport className={viewport()} />
      </div>
    </NavigationMenu.Root>
  );
}

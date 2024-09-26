"use client";

import React from "react";
import Link from "next/link";
import * as Primitive from "@radix-ui/react-navigation-menu";

import { tv, VariantProps } from "@/utils/tailwind-variants";
import { sem } from "@/utils/semantic-styles";
import { NavigationModule } from "./types";

export const navigationVariant = tv({
  slots: {
    root: ["flex", "w-screen", "justify-center"],
    list: sem()
      .layout(["flex", "p-1", "gap-1", "list-none", "rounded-circle"])
      .color(["bg-light-surfaceDim", "dark:bg-dark-surfaceDim"])
      .build(),
    button: ["rounded-circle", "transition-colors", "block", "select-none"],
    content: sem()
      .layout([
        "absolute",
        "left-0 top-0",
        "min-w-[1024px] max-w-[60%] sm:w-auto",
      ])
      .color(["text-light-onSurface", "dark:text-dark-onSurface"])
      .transition([
        "data-[motion=from-start]:animate-enterFromLeft",
        "data-[motion=from-end]:animate-enterFromRight",
        "data-[motion=to-start]:animate-exitToLeft",
        "data-[motion=to-end]:animate-exitToRight",
      ])
      .build(),
    viewport: sem()
      .layout([
        "relative",
        "mt-[-14px]",
        "h-[var(--radix-navigation-menu-viewport-height)]",
        "sm:w-[var(--radix-navigation-menu-viewport-width)]",
        "w-full",
        "overflow-hidden",
        "shadow-md",
      ])
      .color([
        "bg-light-surfaceContainerLow",
        "dark:bg-dark-surfaceContainerLow",
      ])
      .transition([
        "data-[state=open]:animate-scaleIn",
        "data-[state=closed]:animate-scaleOut",

        "origin-[top_center]",
        "transition-[width,_height]",
        "duration-300",
      ])
      .build(),
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
    ui_color: {
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
    ui_size: {
      large: {
        button: ["px-6", "py-2"],
        content: ["p-8"],
        viewport: ["rounded-6"],
      },
      medium: {
        button: ["px-4", "py-1.5"],
        content: ["p-8"],
        viewport: ["rounded-4"],
      },
      small: {
        button: ["px-3", "py-1"],
        content: ["p-6"],
        viewport: ["rounded-2"],
      },
    },
  },
  defaultVariants: {
    ui_color: "none",
    ui_size: "medium",
  },
});

export interface NavigationProps
  extends Primitive.NavigationMenuProps,
    VariantProps<typeof navigationVariant> {
  modules: NavigationModule[];
}

export default function Navigation({
  modules,
  ui_color: accentColor,
  ui_size,
  className,
  ...props
}: NavigationProps) {
  const { root, list, button, content, viewport, viewportWrapper } =
    navigationVariant({ ui_color: accentColor, ui_size });

  return (
    <Primitive.Root
      delayDuration={0}
      className={root({ className })}
      {...props}
    >
      <Primitive.List className={list()}>
        {modules.map((module) => (
          <Primitive.Item key={module.key}>
            {module.type === "dropdown" ? (
              <>
                <Primitive.Trigger
                  className={button({
                    ui_color: accentColor,
                  })}
                >
                  {module.title}
                </Primitive.Trigger>
                <Primitive.Content className={content()}>
                  {module.content}
                </Primitive.Content>
              </>
            ) : (
              <Primitive.Link asChild>
                <Link
                  className={button({
                    ui_color: accentColor,
                  })}
                  href={module.href}
                >
                  {module.title}
                </Link>
              </Primitive.Link>
            )}
          </Primitive.Item>
        ))}
      </Primitive.List>

      <div className={viewportWrapper()}>
        <Primitive.Viewport className={viewport()} />
      </div>
    </Primitive.Root>
  );
}

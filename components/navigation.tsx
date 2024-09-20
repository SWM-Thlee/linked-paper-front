"use client";

import { Navigation as UiNavigation } from "@/ui/navigation";
import { HStack } from "@/components/stactk";
import { modules } from "./main-navigation-modules";

export default function Navigation() {
  return (
    <HStack className="justify-self-center">
      <UiNavigation _color="primary" modules={modules} />
    </HStack>
  );
}

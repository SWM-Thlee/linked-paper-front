"use client";

import { Navigation as UiNavigation } from "@/ui/navigation";
import { modules } from "./main-navigation-modules";

export default function Navigation() {
  return (
    <div className="justify-self-center">
      <UiNavigation _color="primary" modules={modules} />
    </div>
  );
}

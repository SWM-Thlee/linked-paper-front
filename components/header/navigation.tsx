"use client";

import { Navigation } from "@/ui/navigation";
import { search } from "@/features/search/components/navigation";

export default function HeaderNavigation() {
  return (
    <div className="justify-self-center">
      <Navigation ui_color="primary" modules={[search]} />
    </div>
  );
}

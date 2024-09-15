"use client";

import { Navigation } from "@/ui/navigation";
import { search } from "@/features/search/components/navigation";

export default function HeaderNavigation() {
  return (
    <div className="absolute flex h-full w-[1024px] items-center justify-center">
      <Navigation ui_color="primary" modules={[search]} />
    </div>
  );
}

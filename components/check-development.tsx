"use client";

import useIsClient from "@/hooks/use-is-client";
import Button from "@/ui/button";

const IS_DEVELOPMENT_MODE = process.env.NODE_ENV !== "production";

export default function CheckDevelopment() {
  const isClient = useIsClient();

  if (!isClient || !IS_DEVELOPMENT_MODE) return null;

  return (
    <Button
      ui_color="tertiary"
      ui_size="large"
      ui_variant="light"
      className="fixed bottom-[3rem] left-[3rem] flex items-center gap-4 text-title-medium"
    >
      IN DEVELOPMENT
    </Button>
  );
}

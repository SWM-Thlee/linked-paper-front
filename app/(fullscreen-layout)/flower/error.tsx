"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

import ScrollLockOnce from "@/components/layout/scroll-lock-once";
import LabelButton from "@/ui/label-button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ScrollLockOnce>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex h-[65vh] w-[65vh] animate-scaleIn flex-col items-center justify-center gap-8 rounded-circle ring-4 ring-inset ring-light-error dark:ring-dark-error">
          <div className="text-headline-large">Failed to bloom a flower</div>
          <LabelButton
            ui_color="secondary"
            ui_size="large"
            ui_variant="light"
            onClick={() => window.location.reload()}
          >
            Try again
          </LabelButton>
        </div>
      </div>
    </ScrollLockOnce>
  );
}

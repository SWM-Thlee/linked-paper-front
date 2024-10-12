"use client";

import { useRouter } from "next/navigation";

import PageContainer from "@/components/page-container";
import ScrollLockOnce from "@/components/page-only/scroll-lock-once";
import Button from "@/ui/button";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import WarningIcon from "@/ui/icons/warning";
import { Suspense } from "react";
import ErrorReason from "../error-reason";

// .../error/400?reason={reason}
export default function Page() {
  const router = useRouter();

  return (
    <ScrollLockOnce>
      <PageContainer>
        <div className="mt-48 flex flex-col gap-12 text-light-onSurface dark:text-dark-onSurface">
          <div className="flex flex-col gap-8">
            <WarningIcon ui_size="exlarge" />
            <div className="select-none text-display-large">
              400 Bad Request
            </div>
            <div className="select-none text-display-small">
              From - <i className="select-text">Semantic Search</i>
            </div>
            <Suspense>
              <ErrorReason />
            </Suspense>
          </div>
          <hr className="border-light-outline dark:border-dark-outline" />
          <div className="flex gap-2">
            <Button
              ui_size="large"
              ui_variant="bordered"
              className="flex items-center gap-2 text-title-medium"
              onClick={router.back}
            >
              <ArrowBackIcon />
              Back to the Previous Page
            </Button>
          </div>
        </div>
      </PageContainer>
    </ScrollLockOnce>
  );
}

"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";

import PageContainer from "@/components/layout/page-container";
import ScrollLockOnce from "@/components/layout/scroll-lock-once";
import Button from "@/ui/button";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import WarningIcon from "@/ui/icons/warning";
import Footer from "@/components/footer";
import ErrorReasonSkeleton from "../../components/error-reason-skeleton";
import ErrorReason from "../../components/error-reason";

type ErrorLayoutProps = {
  children?: React.ReactNode;
};

export default function ErrorLayout({ children }: ErrorLayoutProps) {
  const router = useRouter();

  return (
    <ScrollLockOnce>
      <div className="mt-24 grid auto-rows-auto grid-cols-[1fr_auto_1fr] gap-16">
        <div className="col-[2_/_3] row-[2_/_3]">
          <PageContainer>
            <div className="mt-48 flex flex-col gap-12 text-light-onSurface dark:text-dark-onSurface">
              <div className="flex flex-col gap-8">
                <WarningIcon ui_size="exlarge" />
                <div className="select-none text-display-large">{children}</div>
                <Suspense fallback={<ErrorReasonSkeleton />}>
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
        </div>
        <div className="col-[1_/_4] row-[3_/_4]">
          <Footer />
        </div>
      </div>
    </ScrollLockOnce>
  );
}

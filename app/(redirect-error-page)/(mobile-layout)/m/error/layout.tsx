"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";

import Button from "@/ui/button";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import WarningIcon from "@/ui/icons/warning";
import Footer from "@/components/footer";
import MobilePageContainer from "@/components/layout/mobile-page-container";
import MobileErrorReasonSkeleton from "@/app/(redirect-error-page)/components/mobile/error-reason-skeleton";
import MobileErrorReason from "@/app/(redirect-error-page)/components/mobile/error-reason";

type ErrorLayoutProps = {
  children?: React.ReactNode;
};

export default function ErrorLayout({ children }: ErrorLayoutProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col justify-between gap-16">
      <MobilePageContainer>
        <div className="mt-48 flex flex-col gap-8 px-8 text-light-onSurface dark:text-dark-onSurface">
          <div className="flex flex-col gap-8">
            <WarningIcon ui_size="large" />
            <div className="select-none text-title-large">{children}</div>
            <Suspense fallback={<MobileErrorReasonSkeleton />}>
              <MobileErrorReason />
            </Suspense>
          </div>
          <hr className="border-light-outline dark:border-dark-outline" />
          <Button
            ui_size="large"
            ui_variant="bordered"
            className="flex items-center justify-center gap-2 text-label-large"
            onClick={router.back}
          >
            <ArrowBackIcon />
            Back to the Previous Page
          </Button>
        </div>
      </MobilePageContainer>
      <div className="col-[1_/_4] row-[3_/_4]">
        <Footer />
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";

export default function MobileErrorReason() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const reason = searchParams.get("reason");

  return (
    <>
      <div className="select-none text-headline-small">
        From - <i className="select-text">{from ?? "Unknown Error"}</i>
      </div>
      <div className="select-none text-headline-small">
        Because of - <i className="select-text">{reason ?? "Unknown Reason"}</i>
      </div>
    </>
  );
}

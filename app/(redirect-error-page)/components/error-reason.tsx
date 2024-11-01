"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorReason() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const reason = searchParams.get("reason");

  return (
    <>
      <div className="select-none text-display-small">
        From - <i className="select-text">{from ?? "Unknown Error"}</i>
      </div>
      <div className="select-none text-display-small">
        Because of - <i className="select-text">{reason ?? "Unknown Reason"}</i>
      </div>
    </>
  );
}

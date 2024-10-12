"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorReason() {
  const searchParams = useSearchParams();
  const errorReason = searchParams.get("reason");

  return errorReason ? (
    <div className="select-none text-display-small">
      Because of - <i className="select-text">{errorReason}</i>
    </div>
  ) : null;
}

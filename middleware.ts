import { NextRequest, NextResponse, userAgent } from "next/server";

/** 사용자의 디바이스를 감지합니다. */
export function middleware({ nextUrl, headers }: NextRequest) {
  const { device } = userAgent({ headers });
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  /* 모바일 디바이스인 경우, 모바일 버전으로 리다이렉트합니다. */
  if (viewport === "mobile") {
    nextUrl.pathname = `/m${nextUrl.pathname}`;
    return NextResponse.rewrite(nextUrl);
  }

  return NextResponse.next();
}

/* 모바일 버전이 존재하는 페이지만 미들웨어를 적용합니다. */
export const config = {
  matcher: ["/", "/search", "/error/:path*"],
};

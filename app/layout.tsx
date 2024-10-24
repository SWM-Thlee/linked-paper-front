import { Viewport } from "next";
import { Toaster } from "react-hot-toast";

import { playfair, urbanist } from "@/config/fonts";

import "@/globals.css";
import Header from "@/components/header";
import StateProvider from "@/components/state-provider";
import BodyWithScrollLock from "@/components/layout/body-with-scroll-lock";
import ThemeProvider from "@/features/theme/components/theme-provider";
import { DefaultMetadata } from "@/features/seo/metadata/default";

/* 메인 페이지의 메타데이터이자 기본 메타데이터를 나타냅니다. */
export const metadata = DefaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Header, Main, Footer 컴포넌트가 독립적으로 구성된다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="ko"
      className={`${playfair.variable} ${urbanist.variable}`}
    >
      <StateProvider>
        <BodyWithScrollLock>
          <ThemeProvider>
            <Header />
            {children}
            <Toaster toastOptions={{ position: "bottom-right" }} />
          </ThemeProvider>
        </BodyWithScrollLock>
      </StateProvider>
    </html>
  );
}

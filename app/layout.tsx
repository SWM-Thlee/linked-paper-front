import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

import { siteConfig } from "@/config/site";
import { playfair, urbanist } from "@/config/fonts";

import "@/globals.css";
import Header from "@/components/header";
import CheckDevelopment from "@/components/check-development";
import StateProvider from "@/components/state-provider";
import BodyWithScrollLock from "@/components/body-with-scroll-lock";
import ThemeProvider from "@/features/theme/components/theme-provider";

// 웹 페이지의 기본 메타데이터이다.
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

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
            <CheckDevelopment />
            <Toaster toastOptions={{ position: "bottom-right" }} />
          </ThemeProvider>
        </BodyWithScrollLock>
      </StateProvider>
    </html>
  );
}

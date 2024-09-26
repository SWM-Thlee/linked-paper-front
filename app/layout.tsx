import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { playfair, urbanist } from "@/config/fonts";

import "@/globals.css";
import CheckDevelopment from "@/components/check-development";
import ThemeProvider from "@/components/theme-provider";
import StateProvider from "@/components/state-provider";
import BodyWithScrollLock from "@/components/body-with-scroll-lock";

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
  header,
  children,
  aside,
  footer,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  aside: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="ko"
      className={`${playfair.variable} ${urbanist.variable}`}
    >
      <StateProvider>
        <BodyWithScrollLock>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="grid auto-rows-auto grid-cols-[1fr_auto_1fr] gap-16">
              <div className="sticky top-0 col-[2_/_3] row-[1_/_2]">
                {header}
              </div>
              <div className="col-[2_/_3] row-[2_/_3]">{children}</div>
              <div className="col-[3_/_4] row-[1_/_3]">{aside}</div>
              <div className="col-[1_/_4] row-[3_/_4]">{footer}</div>
            </div>
            <CheckDevelopment />
          </ThemeProvider>
        </BodyWithScrollLock>
      </StateProvider>
    </html>
  );
}

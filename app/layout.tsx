import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { playfair, urbanist } from "@/config/fonts";
import Providers from "@/components/providers";

import "@/globals.css";

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
  footer,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="ko"
      className={`${playfair.variable} ${urbanist.variable}`}
    >
      <body className="bg-light-surfaceContainer dark:bg-dark-surfaceContainer">
        <Providers themeProps={{ attribute: "class", enableSystem: true }}>
          <div className="mx-auto flex min-h-dvh flex-col items-center justify-between gap-16">
            {header}
            {children}
            {footer}
          </div>
        </Providers>
      </body>
    </html>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";

import { ogFonts, ogImages } from "@/features/seo/metadata/default";

// Runtime
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const endpoint =
    process.env.NEXT_PUBLIC_DEV_ENDPOINT ?? "https://linked-paper.com";

  if (!title) {
    return NextResponse.redirect(new URL(ogImages.main, endpoint));
  }

  const [titleFont, contentFont] = await Promise.all([
    fetch(new URL(ogFonts.title, endpoint)).then((res) => res.arrayBuffer()),
    fetch(new URL(ogFonts.content, endpoint)).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundImage: `url(${new URL(ogImages.flower, endpoint)})`,
          height: "100%",
          width: "100%",
          padding: "7.5%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "block",
              fontFamily: '"og-title"',
              color: "#E4E1E9",
              fontSize: "45px",
              lineHeight: "52px",
              lineClamp: 3,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: '"og-content"',
              color: "#E4E1E9",
              fontSize: "32px",
              lineHeight: "40px",
            }}
          >
            Flower Correlations from Linked Paper
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "og-title", data: titleFont, style: "normal" },
        { name: "og-content", data: contentFont, style: "normal" },
      ],
    },
  );
}

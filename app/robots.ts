import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/search/", "/flower/", "/res/", "/api/"],
    },
    sitemap: "https://linked-paper.com/sitemap.xml",
  };
}

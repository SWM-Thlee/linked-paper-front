"use client";

import Link from "next/link";

import Button from "@/ui/button";
import BloomIcon from "@/ui/icons/bloom";
import { Search } from "@/features/search/types";
import SearchResultOriginLink from "./origin";
import SearchResultPdfLink from "./pdf";

type Props = Pick<Search.Result.Data, "id" | "link">;

export default function SearchResultItemLinks({
  id,
  link: { origin_link, pdf_link },
}: Props) {
  return (
    <div className="flex flex-col items-stretch justify-end gap-2">
      <Button>
        <Link
          href={{ pathname: "/flower", query: { id } }}
          className="flex items-center justify-between gap-4"
        >
          <BloomIcon ui_size="small" />
          <span className="text-label-large">Bloom</span>
        </Link>
      </Button>
      {origin_link && <SearchResultOriginLink origin_link={origin_link} />}
      {pdf_link && <SearchResultPdfLink pdf_link={pdf_link} />}
    </div>
  );
}

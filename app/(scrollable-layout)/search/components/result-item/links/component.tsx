"use client";

import Link from "next/link";

import { Search } from "@/features/search/types";
import Button from "@/ui/button";
import BloomIcon from "@/ui/icons/bloom";
import SearchResultOriginLink from "./origin";
import SearchResultPdfLink from "./pdf";

type Props = Pick<Search.Result.Data, "id" | "link">;

export default function SearchResultItemLinks({
  id,
  link: { origin_link, pdf_link },
}: Props) {
  return (
    <div className="flex flex-col justify-end gap-2">
      <Link href={{ pathname: "/flower", query: { id } }} prefetch={false}>
        <Button
          ui_size="large"
          className="flex w-full flex-col items-center gap-2"
        >
          <BloomIcon ui_size="exlarge" />
          <div className="text-label-large">Flower Graph</div>
        </Button>
      </Link>
      {origin_link && <SearchResultOriginLink origin_link={origin_link} />}
      {pdf_link && <SearchResultPdfLink pdf_link={pdf_link} />}
    </div>
  );
}

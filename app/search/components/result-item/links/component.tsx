"use client";

import Link from "next/link";

import { Search } from "@/features/search/types";
import BloomIcon from "@/ui/icons/bloom";
import LabelButton from "@/ui/label-button";
import SearchResultOriginLink from "./origin";
import SearchResultPdfLink from "./pdf";

type Props = Pick<Search.Result.Data, "id" | "link">;

export default function SearchResultItemLinks({
  id,
  link: { origin_link, pdf_link },
}: Props) {
  return (
    <div className="flex flex-col items-stretch justify-end gap-2">
      <LabelButton ui_size="medium" ui_variant="bordered">
        <Link
          href={{ pathname: "/flower", query: { id } }}
          className="flex w-full items-center justify-between gap-4"
        >
          <BloomIcon ui_size="small" />
          <div>Bloom</div>
        </Link>
      </LabelButton>
      {origin_link && <SearchResultOriginLink origin_link={origin_link} />}
      {pdf_link && <SearchResultPdfLink pdf_link={pdf_link} />}
    </div>
  );
}

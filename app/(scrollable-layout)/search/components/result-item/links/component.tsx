"use client";

import Link from "next/link";

import { Search } from "@/features/search/types";
import LabelButton from "@/ui/label-button";
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
        <LabelButton ui_size="medium" className="w-full">
          <BloomIcon ui_size="small" />
          Graph
        </LabelButton>
      </Link>
      {origin_link && <SearchResultOriginLink origin_link={origin_link} />}
      {pdf_link && <SearchResultPdfLink pdf_link={pdf_link} />}
    </div>
  );
}

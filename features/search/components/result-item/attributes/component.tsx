"use client";

import { PaperMetadata } from "@/types/paper";
import AttributeAuthors from "./authors";
import AttributeCategories from "./categories";
import AttributeOthers from "./others";

type Props = Pick<
  PaperMetadata,
  | "authors"
  | "categories"
  | "journal"
  | "date"
  | "reference_count"
  | "citiation_count"
>;

export default function SearchResultItemInfo({
  authors,
  categories,
  journal,
  date,
  reference_count,
  citiation_count,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <AttributeAuthors authors={authors} />
      <AttributeCategories categories={categories} />
      <AttributeOthers
        journal={journal}
        date={date}
        reference_count={reference_count}
        citiation_count={citiation_count}
      />
    </div>
  );
}

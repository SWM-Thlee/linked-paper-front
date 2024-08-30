"use client";

import { PaperMetadata } from "@/types/paper";
import AttributeAuthors from "./authors";
import AttributeFields from "./fields";
import AttributeOthers from "./others";

type Props = Pick<
  PaperMetadata,
  | "authors"
  | "fields"
  | "journal"
  | "date"
  | "reference_count"
  | "citiation_count"
>;

export default function SearchResultItemInfo({
  authors,
  fields,
  journal,
  date,
  reference_count,
  citiation_count,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <AttributeAuthors authors={authors} />
      <AttributeFields fields={fields} />
      <AttributeOthers
        journal={journal}
        date={date}
        reference_count={reference_count}
        citiation_count={citiation_count}
      />
    </div>
  );
}

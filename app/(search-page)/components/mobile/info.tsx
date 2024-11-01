import React, { useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import CitationIcon from "@/ui/icons/citation";
import DateIcon from "@/ui/icons/date";
import JournalIcon from "@/ui/icons/journal";
import AuthorIcon from "@/ui/icons/author";
import ReferenceIcon from "@/ui/icons/reference";
import useCategories from "@/features/paper/hooks/use-categories";
import CategoryIcon from "@/ui/icons/category";
import SubIcon from "@/ui/icons/sub";

export type ResultItemInfoProps = {
  authors: string[];
  categories: string[];
  journal: string;
  date: string;
  referenceCount: number;
  citationCount: number;
  defaultOpen?: boolean;
};

function Authors({ authors }: { authors: string[] }) {
  return authors.length > 0 ? (
    <div className="flex items-center gap-2">
      <AuthorIcon ui_size="small" />
      <div className="max-w-[15rem] break-words text-left text-label-medium">
        {authors[0]}
      </div>
    </div>
  ) : null;
}

function Categories({ categories: categoryIDs }: { categories: string[] }) {
  const { getGroups } = useCategories();

  const groupsOfCategories = useDeepCompareMemo(
    () => getGroups(categoryIDs),
    [categoryIDs, getGroups],
  );

  return categoryIDs.length > 0 ? (
    <div className="flex flex-col items-start gap-2">
      {Object.entries(groupsOfCategories).map(([subject, categories]) => (
        <React.Fragment key={subject}>
          <div className="flex items-center gap-2 text-label-medium">
            <CategoryIcon ui_size="small" />
            {subject}
          </div>
          <ul className="grid w-full grid-cols-[4fr_1fr] gap-2 text-label-small">
            {Object.entries(categories).map(([categoryID, info]) => (
              <React.Fragment key={categoryID}>
                <li className="ml-4 flex items-center gap-2 text-left">
                  <SubIcon ui_size="small" />
                  {info.description}
                </li>
                <div className="text-right">{categoryID}</div>
              </React.Fragment>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  ) : null;
}

function Journal({ journal }: { journal: string }) {
  return journal ? (
    <div className="flex items-center gap-2">
      <JournalIcon ui_size="small" />
      <div className="max-w-[15rem] break-words text-left text-label-medium">
        {journal}
      </div>
    </div>
  ) : null;
}

function Date({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-2">
      <DateIcon ui_size="small" />
      <div className="text-label-medium">{date}</div>
    </div>
  );
}

function ReferenceCount({ referenceCount }: { referenceCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <ReferenceIcon ui_size="small" />
      <div className="text-label-medium">{referenceCount}</div>
    </div>
  );
}

function CitationCount({ citationCount }: { citationCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <CitationIcon ui_size="small" />
      <div className="text-label-medium">{citationCount}</div>
    </div>
  );
}

export default function ResultItemInfo({
  authors,
  categories,
  journal,
  date,
  referenceCount,
  citationCount,
  defaultOpen = false,
}: ResultItemInfoProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="relative rounded-2 p-4 text-label-large text-light-onSurface ring-2 ring-inset ring-light-outlineVariant dark:text-dark-onSurface dark:ring-dark-outlineVariant"
    >
      {isOpen ? (
        <div className="flex animate-fadeIn flex-col gap-3">
          <Authors authors={authors} />
          <Journal journal={journal} />
          <Date date={date} />
          <ReferenceCount referenceCount={referenceCount} />
          <CitationCount citationCount={citationCount} />
          <Categories categories={categories} />
        </div>
      ) : (
        <div className="flex animate-fadeIn flex-wrap items-center gap-3">
          <Date date={date} />
          <CitationCount citationCount={citationCount} />
          <Journal journal={journal} />
        </div>
      )}
    </button>
  );
}

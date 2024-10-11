import { Search } from "@/features/search/types";
import { CustomizedFilterInfoProps } from "@/features/filter/components/info";
import { JournalContent, JournalKey } from "./journal";
import { CategoryContent, CategoryKey } from "./category";
import { DateContent, DateKey } from "./date";

type Keys = NonNullable<
  CustomizedFilterInfoProps<Search.Filter.Type>["attributeKey"]
>;

/* eslint-disable react/function-component-definition */
export const SearchFilterAttributeKey: Keys = (key) => {
  switch (key) {
    case "journal":
      return <JournalKey />;
    case "category":
      return <CategoryKey />;
    case "date":
      return <DateKey />;
    default:
      return null;
  }
};

type Contents =
  CustomizedFilterInfoProps<Search.Filter.Type>["attributeContent"] &
    NonNullable<unknown>;

/* eslint-disable react/function-component-definition */
export const SearchFilterAttributeContent: Contents = ([key, content]) => {
  switch (key) {
    case "journal":
      return <JournalContent {...content} />;
    case "category":
      return <CategoryContent {...content} />;
    case "date":
      return <DateContent {...content} />;
    default:
      return null;
  }
};

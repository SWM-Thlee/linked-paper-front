import { Search } from "@/features/search/types";
import { View } from "./track";

export type SearchFilterPayload = {
  filter_journal?: string[];
  filter_date_start?: string;
  filter_date_end?: string;
  filter_category?: string[];
};

export type SearchQueryPayload = {
  query: string;
};

export type SortingPayload = {
  sorting: Search.Query.Sorting;
};

export type ViewPayload = {
  view: View;
};

export type PaperPayload = {
  id: string;
  title: string;
  abstraction: string;
  journal: string;
  authors: string[];
  categories: string[];
  reference_count: number;
  citiation_count: number;
  origin_link?: string;
  pdf_link?: string;
  date: string;
};

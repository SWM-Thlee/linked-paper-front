import { Search } from "@/features/search/types";
import * as Track from "./track";

export type SearchFilter = {
  filter_journal?: string[];
  filter_date_start?: string;
  filter_date_end?: string;
  filter_category?: string[];
};

export type SearchQuery = {
  query: string;
};

export type Sorting = {
  sorting: Search.Query.Sorting;
};

export type View = {
  view: Track.View;
};

export type SearchIndex = {
  index: number;
};

export type FlowerTransition = {
  paper: Paper;
  parent_paper: Paper;
  similarity: number;
};

export type Paper = {
  id: string;
  title: string;
  abstraction: string;
  journal: string;
  authors: string[];
  categories: string[];
  reference_count: number;
  citation_count: number;
  origin_link?: string;
  pdf_link?: string;
  date: string;
};

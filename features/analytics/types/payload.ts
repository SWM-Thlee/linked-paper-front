import { Search } from "@/features/search/types";
import { Metadata as PaperMetadata } from "@/features/paper/types/scheme";
import * as Track from "./track";

export type SearchFilter = {
  filter_journal?: string[] | null;
  filter_date_start?: string | null;
  filter_date_end?: string | null;
  filter_category?: string[] | null;
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

export type FlowerTransition = Paper & {
  parent_paper_id: string;
  similarity: number;
};

export type Paper = Omit<PaperMetadata, "extraID">;

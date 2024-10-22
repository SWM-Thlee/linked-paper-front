import { Optional } from "@/utils/type-helper";
import * as Payloads from "./payload";

const Type = {
  /* Search (Query) */
  SEARCH_QUERY_MAIN: "search_query_main",
  SEARCH_QUERY_NAV: "search_query_nav",
  SEARCH_QUERY_RESULT: "search_query_result",

  /* Filter */
  CREATE_FILTER: "create_filter",
  DELETE_FILTER: "delete_filter",
  FILTER_APPLY: "filter_apply",
  CHANGE_FILTER_SORTING: "change_filter_sorting",

  /* Page View */
  CLICK_ORIGIN_LINK: "click_origin_link",
  CLICK_PDF_LINK: "click_pdf_link",
  CLICK_GRAPH_VIEW: "click_graph_view",
  SEARCH_RESULTS_VIEW: "search_results_view",
  RESULTS_NEXT_PAGE: "results_next_page",

  /* Graph (View) */
  CLICK_GRAPH_NODE: "click_graph_node",
} as const;

export type Type = (typeof Type)[keyof typeof Type];
export const {
  CHANGE_FILTER_SORTING,
  SEARCH_QUERY_MAIN,
  SEARCH_QUERY_NAV,
  SEARCH_QUERY_RESULT,
  CLICK_ORIGIN_LINK,
  CLICK_PDF_LINK,
  CLICK_GRAPH_VIEW,
  CREATE_FILTER,
  DELETE_FILTER,
  FILTER_APPLY,
  CLICK_GRAPH_NODE,
  SEARCH_RESULTS_VIEW,
  RESULTS_NEXT_PAGE,
} = Type;

type PayloadTypes = {
  [Type.CHANGE_FILTER_SORTING]: Payloads.Sorting;
  [Type.SEARCH_QUERY_MAIN]: Payloads.SearchQuery & Payloads.SearchFilter;
  [Type.SEARCH_QUERY_NAV]: Payloads.SearchQuery & Payloads.SearchFilter;
  [Type.SEARCH_QUERY_RESULT]: Payloads.SearchQuery & Payloads.SearchFilter;
  [Type.CLICK_ORIGIN_LINK]: Payloads.View &
    Payloads.Paper &
    Optional<Payloads.SearchQuery & Payloads.SearchFilter>;
  [Type.CLICK_PDF_LINK]: Payloads.View &
    Payloads.Paper &
    Optional<Payloads.SearchQuery & Payloads.SearchFilter>;
  [Type.CLICK_GRAPH_VIEW]: Payloads.Paper &
    Payloads.SearchQuery &
    Payloads.SearchFilter;
  [Type.CREATE_FILTER]: Payloads.SearchFilter;
  [Type.DELETE_FILTER]: Payloads.SearchFilter;
  [Type.FILTER_APPLY]: Payloads.SearchFilter;
  [Type.CLICK_GRAPH_NODE]: Payloads.FlowerTransition;
  [Type.SEARCH_RESULTS_VIEW]: Payloads.SearchQuery & Payloads.SearchFilter;
  [Type.RESULTS_NEXT_PAGE]: Payloads.SearchQuery &
    Payloads.SearchFilter &
    Payloads.SearchIndex;
};

export type Payload<T extends Type> = PayloadTypes[T];

import { Optional } from "@/utils/type-helper";
import {
  PaperPayload,
  SearchFilterPayload,
  SearchQueryPayload,
  SortingPayload,
  ViewPayload,
} from "./scheme";

const Type = {
  /* Search Query Request */
  SEARCH_QUERY_MAIN: "search_query_main",
  SEARCH_QUERY_NAV: "search_query_nav",
  SEARCH_QUERY_RESULT: "search_query_result",

  /* Filter */
  CHANGE_FILTER_SORTING: "change_filter_sorting",

  /* Page Transition */
  CLICK_ORIGIN_LINK: "click_origin_link",
  CLICK_PDF_LINK: "click_pdf_link",
  CLICK_GRAPH_VIEW: "click_graph_view",
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
} = Type;

type PayloadTypes = {
  [Type.CHANGE_FILTER_SORTING]: SortingPayload;
  [Type.SEARCH_QUERY_MAIN]: SearchQueryPayload & SearchFilterPayload;
  [Type.SEARCH_QUERY_NAV]: SearchQueryPayload & SearchFilterPayload;
  [Type.SEARCH_QUERY_RESULT]: SearchQueryPayload & SearchFilterPayload;
  [Type.CLICK_ORIGIN_LINK]: ViewPayload &
    PaperPayload &
    Optional<SearchQueryPayload> &
    Optional<SearchFilterPayload>;
  [Type.CLICK_PDF_LINK]: ViewPayload &
    PaperPayload &
    Optional<SearchQueryPayload> &
    Optional<SearchFilterPayload>;
  [Type.CLICK_GRAPH_VIEW]: PaperPayload &
    SearchQueryPayload &
    SearchFilterPayload;
};

export type Payload<T extends Type> = PayloadTypes[T];

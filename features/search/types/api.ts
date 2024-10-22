import { Info } from "./query";
import { Data } from "./result";

/** Server State로 관리하는 내부 데이터 스키마입니다.  */
export const ResultStatus = {
  OK: "OK",
  LAST_PAGE: "LAST_PAGE",
} as const;

export type ResultStatus = (typeof ResultStatus)[keyof typeof ResultStatus];

export interface Result extends Info {
  count: number;
  status: ResultStatus;
  data: Data[];
}

/** Server 응답의 데이터 스키마입니다. */
export const ResponseStatus = {
  OK: "Success",
  LAST_PAGE: "No results found",
} as const;

export type ResponseStatus =
  (typeof ResponseStatus)[keyof typeof ResponseStatus];

export const ResponseToResult = {
  [ResponseStatus.OK]: ResultStatus.OK,
  [ResponseStatus.LAST_PAGE]: ResultStatus.LAST_PAGE,
} as const;

export interface ResultDataResponse {
  id: string;
  title: string;
  abstraction: string;
  journal: string;
  authors: string[];
  categories: string[];
  reference_count: number;

  // TODO: 오타
  citiation_count: number;
  origin_link?: string;
  pdf_link?: string;
  date: string;
  weight: number;
}

export interface Response {
  count: number;
  status: ResponseStatus;
  data: ResultDataResponse[];
}

export const NoStore: RequestInit = { cache: "no-store" };

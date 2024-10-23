import { Paper } from "@/features/paper/types";
import { Info } from "./query";

/** Server State로 관리하는 내부 데이터 스키마입니다.  */
export const ResultStatus = {
  OK: "OK",
  LAST_PAGE: "LAST_PAGE",
} as const;

export type ResultStatus = (typeof ResultStatus)[keyof typeof ResultStatus];

export interface Result extends Info {
  count: number;
  status: ResultStatus;
  data: Paper.Scheme.ResultMetadata[];
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

export interface Response {
  count: number;
  status: ResponseStatus;
  data: Paper.Scheme.ResponseMetadata[];
}

export const NoStore: RequestInit = { cache: "no-store" };

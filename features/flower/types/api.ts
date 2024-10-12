import { Data } from "@/features/search/types/result";
import { ResultDataResponse } from "@/features/search/types/api";
import { PaperMetadata } from "@/types/paper";
import { Info } from "./query";

export const Status = {
  OK: "success",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

/** Server State로 관리하는 내부 데이터 스키마입니다.  */
export interface Result extends Info {
  count: number;
  status: Status;
  paper: PaperMetadata;
  data: Data[];
}

/** Server 응답의 데이터 스키마입니다. */
// TODO: Paper Feature을 따로 분리할 것
export interface Response {
  count: number;
  status: Status;
  data: ResultDataResponse[];
}

export const NoStore: RequestInit = { cache: "no-store" };
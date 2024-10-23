import { Paper } from "@/features/paper/types";
import { Info } from "./query";

export const Status = {
  OK: "success",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

/** Server State로 관리하는 내부 데이터 스키마입니다.  */
export interface Result extends Info {
  count: number;
  status: Status;
  paper: Paper.Scheme.Metadata;
  data: Paper.Scheme.ResultMetadata[];
}

/** Server 응답의 데이터 스키마입니다. */
export interface Response {
  count: number;
  status: Status;
  data: Paper.Scheme.ResponseMetadata[];
}

export type Error = {
  paperID: Paper.Scheme.Id;
};

export const NoStore: RequestInit = { cache: "no-store" };

import { ErrorResponse, api } from "@/utils/api";
import { convertToResult } from "@/features/paper/utils/converter";
import { convertToQueryString } from "../utils/filter/query";
import { Search } from "../types";

export async function SearchResult(
  info: Search.Query.Info,
): Promise<Search.Api.Result | ErrorResponse> {
  // Server Response
  const response = await api<Search.Api.Response>(
    `/api/search?${convertToQueryString(info)}`,
    Search.Api.NoStore,
  );

  if (response.status === "ERROR") return response;

  // Convert Response to Result
  const { count, data, status } = response.data;

  // TODO: 검증 과정이 필요합니다.
  return {
    ...info,
    count,
    data: data.map(convertToResult),
    status: Search.Api.ResponseToResult[status],
  };
}

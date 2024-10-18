import { ErrorResponse, api } from "@/utils/api";
import { Search } from "../types";
import { convertToQueryString } from "../utils/filter/query";

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
    data: data.map((res) => ({
      id: res.id,
      title: res.title,
      abstraction: res.abstraction,
      journal: res.journal,
      authors: res.authors,
      categories: res.categories,
      reference_count: res.reference_count,
      citiation_count: res.citiation_count,
      link: {
        origin_link: res.origin_link,
        pdf_link: res.pdf_link,
      },
      date: res.date,
      similarity: res.weight,
      version: "v1",
    })),
    status: Search.Api.ResponseToResult[status],
  };
}

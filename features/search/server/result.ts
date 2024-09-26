import { fetchUniversally, UniversalResponse } from "@/utils/fetch-universally";
import { delay, random, repeat } from "@/utils/sample";
import { Search } from "../types";
import { convertToQueryString } from "../utils/filter/query";
import { searchResult } from "../utils/sample";

export interface SearchResultScheme extends Search.Query.Info {
  count: number;
  status: "OK" | "LAST_PAGE";
  data: Search.Result.Data[];
}

// 임시 API 링크
const API_LINK = "https://api.linked-paper.com";

// MOCKING 여부
// Mocking Server를 별도로 구현 예정
const IS_MOCKING = false;

export async function SearchResult(info: Search.Query.Info) {
  if (IS_MOCKING) {
    const result = await delay(2000, () => repeat(info.size, searchResult))();
    const status = random(1, 10) >= 3 ? "OK" : "LAST_PAGE"; // 80%
    const randomSuccess = random(1, 10) >= 3; // 80%

    return (
      randomSuccess
        ? {
            status: "OK",
            data: {
              ...info,
              status,
              count: info.size,
              data: result,
            },
          }
        : { status: "ERROR", errorCode: 500 }
    ) satisfies UniversalResponse<SearchResultScheme>;
  }

  return fetchUniversally<SearchResultScheme>(
    `${API_LINK}/search?${convertToQueryString(info)}`,
    {
      cache: "no-store",
    },
  );
}

import { produce } from "immer";

import { Search } from "../../types";

function copy<T>(data: T): T {
  return produce(data, () => {});
}

// 특정 Filter를 다른 타입으로 변환합니다.
export const converter = {
  "search-preset": {
    "search-default": (data: Search.Filter.Preset): Search.Filter.Default => {
      return {
        ...copy(data),
        feature: "search-default",
      };
    },
  },
  "search-default": {
    "search-preset": (data: Search.Filter.Default): Search.Filter.Preset => {
      return {
        ...copy(data),
        feature: "search-preset",
      };
    },
  },
} as const;

// 특정 Filter로부터 다른 타입의 Filter를 생성합니다.
export const producer = {
  "search-preset": {
    "search-query": (
      id: string,
      data: Search.Filter.Preset,
    ): Search.Filter.Query => {
      return {
        ...copy(data),
        id,
        feature: "search-query",
        link: data.id,
        persist: false,
      };
    },
  },
  "search-default": {
    "search-query": (
      id: string,
      data: Search.Filter.Default,
    ): Search.Filter.Query => {
      return {
        ...copy(data),
        id,
        feature: "search-query",
        link: data.id,
        persist: false,
      };
    },
  },
} as const;

import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

import { Search } from "../../types";

function copy<T>(data: T): T {
  return produce(data, () => {});
}

// 특정 Filter를 다른 타입으로 변환합니다.
export const converter = {
  "search-preset": {
    "search-default": (
      data: Search.FilterV2.Preset,
    ): Search.FilterV2.Default => {
      return {
        ...copy(data),
        feature: "search-default",
      };
    },
  },
  "search-default": {
    "search-preset": (
      data: Search.FilterV2.Default,
    ): Search.FilterV2.Preset => {
      return {
        ...copy(data),
        feature: "search-preset",
      };
    },
  },
  "search-edit": {
    "search-default": (data: Search.FilterV2.Edit): Search.FilterV2.Default => {
      return {
        ...copy(data),
        id: data.link,
        persist: true,
        feature: "search-default",
        link: undefined,
      };
    },
    "search-preset": (data: Search.FilterV2.Edit): Search.FilterV2.Preset => {
      return {
        ...copy(data),
        id: data.link,
        persist: true,
        feature: "search-preset",
        link: undefined,
      };
    },
    "search-query": (data: Search.FilterV2.Edit): Search.FilterV2.Query => {
      return {
        ...copy(data),
        id: data.link,
        feature: "search-query",
        link: undefined,
      };
    },
  },
} as const;

// 특정 Filter로부터 다른 타입의 Filter를 생성합니다.
export const producer = {
  "search-preset": {
    "search-query": (data: Search.FilterV2.Preset): Search.FilterV2.Query => {
      return {
        ...copy(data),
        id: uuidv4(),
        feature: "search-query",
        link: data.id,
        persist: false,
      };
    },
    "search-edit": (data: Search.FilterV2.Preset): Search.FilterV2.Edit => {
      return {
        ...copy(data),
        id: uuidv4(),
        feature: "search-edit",
        link: data.id,
        persist: false,
      };
    },
  },
  "search-default": {
    "search-query": (data: Search.FilterV2.Default): Search.FilterV2.Query => {
      return {
        ...copy(data),
        id: uuidv4(),
        feature: "search-query",
        link: data.id,
        persist: false,
      };
    },
    "search-edit": (data: Search.FilterV2.Default): Search.FilterV2.Edit => {
      return {
        ...copy(data),
        id: uuidv4(),
        feature: "search-edit",
        link: data.id,
        persist: false,
      };
    },
  },
  "search-query": {
    "search-edit": (data: Search.FilterV2.Query): Search.FilterV2.Edit => {
      return {
        ...copy(data),
        feature: "search-edit",
        link: data.id,
      };
    },
  },
} as const;

import { v4 as uuidv4 } from "uuid";
import { Search } from "../../types";

export function createPresetSearchFilter(
  data?: Search.FilterV2.InitialProps,
): Search.FilterV2.Preset {
  return {
    feature: "search-preset",
    id: uuidv4(),
    name: data?.name ?? "",
    persist: true,
    createdAt: new Date(),
    attributes: {
      journal: data?.journal ?? [],
      category: data?.category ?? [],
      date: data?.date ?? {},
    },
  };
}

export function createDefaultSearchFilter(
  data?: Search.FilterV2.InitialProps,
): Search.FilterV2.Default {
  return {
    feature: "search-default",
    id: uuidv4(),
    name: data?.name ?? "",
    persist: true,
    createdAt: new Date(),
    attributes: {
      journal: data?.journal ?? [],
      category: data?.category ?? [],
      date: data?.date ?? {},
    },
  };
}

export function createQuerySearchFilter(
  data?: Search.FilterV2.InitialProps,
): Search.FilterV2.Query {
  return {
    feature: "search-query",
    id: uuidv4(),
    name: data?.name ?? "",
    persist: true,
    createdAt: new Date(),
    attributes: {
      journal: data?.journal ?? [],
      category: data?.category ?? [],
      date: data?.date ?? {},
    },
  };
}

import { v4 as uuidv4 } from "uuid";
import { Search } from "../../types";

export function createPresetSearchFilter(
  data?: Search.Filter.InitialProps,
): Search.Filter.Preset {
  return {
    feature: "search-preset",
    id: uuidv4(),
    name: data?.name ?? "",
    persist: true,
    attributes: {
      journal: data?.journal ?? [],
      category: data?.category ?? [],
      date: data?.date ?? {},
    },
  };
}

export function createDefaultSearchFilter(
  data?: Search.Filter.InitialProps,
): Search.Filter.Default {
  return {
    feature: "search-default",
    id: uuidv4(),
    name: data?.name ?? "",
    persist: true,
    attributes: {
      journal: data?.journal ?? [],
      category: data?.category ?? [],
      date: data?.date ?? {},
    },
  };
}

export function createQuerySearchFilter(
  data?: Search.Filter.InitialProps,
): Search.Filter.Query {
  return {
    feature: "search-query",
    id: uuidv4(),
    name: data?.name ?? "",
    persist: false,
    attributes: {
      journal: data?.journal ?? [],
      category: data?.category ?? [],
      date: data?.date ?? {},
    },
  };
}

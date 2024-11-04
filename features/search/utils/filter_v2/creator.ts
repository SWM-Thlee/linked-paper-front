import { v4 as uuidv4 } from "uuid";
import { Search } from "../../types";

export function createPresetSearchFilter(
  data?: Search.Filter_V2.Optional,
): Search.Filter_V2.Preset {
  return {
    feature: "search-preset",
    id: uuidv4(),
    name: "",
    persist: true,
    journal: [],
    category: [],
    date: {},
    ...data,
  };
}

export function createDefaultSearchFilter(
  data?: Search.Filter_V2.Optional,
): Search.Filter_V2.Default {
  return {
    feature: "search-default",
    id: uuidv4(),
    name: "",
    persist: true,
    journal: [],
    category: [],
    date: {},
    ...data,
  };
}

export function createQuerySearchFilter(
  data?: Search.Filter_V2.Optional,
): Search.Filter_V2.Query {
  return {
    feature: "search-query",
    id: uuidv4(),
    name: "",
    persist: true,
    journal: [],
    category: [],
    date: {},
    ...data,
  };
}

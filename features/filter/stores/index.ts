import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Filter, InitialValue } from "../types/filter";
import { FilterStore } from "../types/store";
import { dispatcherAtomBuilder, filtersAtomBuilder } from "./builder";

export const PERSIST_KEY = "LINKED_PAPER_FILTER";

export const FilterStoreAtom = {
  // Client에 Filter를 저장하는 Store입니다. (기본적으로 LocalStorage에 저장됩니다.)
  PERSIST: atomWithStorage<Filter>(PERSIST_KEY, InitialValue),

  // Filter의 임시 데이터를 저장하는 Store입니다.
  TEMPORARY: atom<Filter>(InitialValue),
} as const satisfies { [id in FilterStore]: object };

export const Dispatcher = {
  PERSIST: dispatcherAtomBuilder(FilterStoreAtom.PERSIST),
  TEMPORARY: dispatcherAtomBuilder(FilterStoreAtom.TEMPORARY),
} as const satisfies { [id in FilterStore]: object };

export const Filters = {
  PERSIST: filtersAtomBuilder(FilterStoreAtom.PERSIST),
  TEMPORARY: filtersAtomBuilder(FilterStoreAtom.TEMPORARY),
} as const satisfies { [id in FilterStore]: object };

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { dispatcherAtomBuilder, filtersAtomBuilder } from "./builder";
import { Filter } from "../types";

export const PERSIST_KEY = "LINKED_PAPER_FILTER";

export const FilterStoreAtom = {
  // Client에 Filter를 저장하는 Store입니다. (기본적으로 LocalStorage에 저장됩니다.)
  PERSIST: atomWithStorage<Filter.Build.Filters>(
    PERSIST_KEY,
    Filter.Build.InitialValue,
  ),

  // Filter의 임시 데이터를 저장하는 Store입니다.
  TEMPORARY: atom<Filter.Build.Filters>(Filter.Build.InitialValue),
} as const satisfies { [id in Filter.Store.Type]: object };

export const AtomDispatcher = {
  PERSIST: dispatcherAtomBuilder(FilterStoreAtom.PERSIST),
  TEMPORARY: dispatcherAtomBuilder(FilterStoreAtom.TEMPORARY),
} as const satisfies { [id in Filter.Store.Type]: object };

export const AtomFilters = {
  PERSIST: filtersAtomBuilder(FilterStoreAtom.PERSIST),
  TEMPORARY: filtersAtomBuilder(FilterStoreAtom.TEMPORARY),
} as const satisfies { [id in Filter.Store.Type]: object };

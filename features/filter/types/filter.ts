import { Search } from "@/features/search/types";
import { Sample } from "./sample";

// 현재 등록된 모든 Filter를 나타냅니다.
export interface Filter {
  [Search.Type]: Search.Filter;
  [Sample.Type]: Sample.Filter;
}

export type FilterFeatureID = keyof Filter & string;

export type FilterDataID<T extends FilterFeatureID> = T extends FilterFeatureID
  ? keyof Filter[T]
  : never;

export type FilterData<T extends FilterFeatureID> = T extends FilterFeatureID
  ? Filter[T][FilterDataID<T>]
  : never;

export type FilterAttributeKey<T extends FilterFeatureID> =
  T extends FilterFeatureID ? keyof FilterData<T>["attributes"] : never;

type FilterAttribute<
  T extends FilterFeatureID,
  U extends FilterAttributeKey<T>,
> = T extends FilterFeatureID
  ? U extends FilterAttributeKey<T>
    ? [U, FilterData<T>["attributes"][U]]
    : never
  : never;

export type FilterAttributeEntry<T extends FilterFeatureID> = FilterAttribute<
  T,
  FilterAttributeKey<T>
>;

/**
 * 초기화 시 사용되는 초기 값입니다.
 */
export const InitialValue: Filter = {
  [Search.Type]: {},
  [Sample.Type]: {},
};

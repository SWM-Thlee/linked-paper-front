import * as Search from "@/features/search/types/filter";
import * as Sample from "./sample";

// 현재 등록된 모든 Filter를 나타냅니다.
export interface Filters {
  [Search.Type]: Search.Filters;
  [Sample.Type]: Sample.Filters;
}

export type FeatureID = keyof Filters & string;

export type DataID<T extends FeatureID> = T extends FeatureID
  ? keyof Filters[T]
  : never;

export type Data<T extends FeatureID> = T extends FeatureID
  ? Filters[T][DataID<T>]
  : never;

export type Attribute<T extends FeatureID> = T extends FeatureID
  ? keyof Data<T>["attributes"]
  : never;

type FilterAttribute<
  T extends FeatureID,
  U extends Attribute<T>,
> = T extends FeatureID
  ? U extends Attribute<T>
    ? [U, Data<T>["attributes"][U]]
    : never
  : never;

export type AttributeEntry<T extends FeatureID> = FilterAttribute<
  T,
  Attribute<T>
>;

/**
 * 초기화 시 사용되는 초기 값입니다.
 */
export const InitialValue: Filters = {
  [Search.Type]: {},
  [Sample.Type]: {},
};

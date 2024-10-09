export type SelectableItem = {
  itemID: string;

  /**
   * 각 아이템의 세부 정보를 배열로 담습니다.
   * 이때, 특정 Feature의 각 Attribute에 따라 명세(약속)를 별도로 지정해야 합니다.
   */
  info: string[];
};

export interface AttributeBase<K extends string, T> {
  type: K;
  value?: T;
}

export type Scheme<T extends Type> = NonNullable<T["value"]>;

export const Attributes = {
  CATEGORY: "category",
  CHECK: "check",
  SELECT: "select",
  MULTI_SELECT: "multi_select",
  NUMBER_RANGE: "num_range",
  DATA_RANGE: "data_range",
} as const;

export interface Category
  extends AttributeBase<typeof Attributes.CATEGORY, string> {}
export interface Check
  extends AttributeBase<typeof Attributes.CHECK, boolean> {}
export interface Select
  extends AttributeBase<typeof Attributes.SELECT, SelectableItem> {}
export interface MultiSelect
  extends AttributeBase<
    typeof Attributes.MULTI_SELECT,
    Record<string, SelectableItem>
  > {}
export interface NumberRange
  extends AttributeBase<
    typeof Attributes.NUMBER_RANGE,
    { min?: number; max?: number }
  > {}
export interface DataRange
  extends AttributeBase<
    typeof Attributes.DATA_RANGE,
    { min?: string; max?: string }
  > {}

export type Type =
  | Select
  | MultiSelect
  | Category
  | Check
  | NumberRange
  | DataRange;

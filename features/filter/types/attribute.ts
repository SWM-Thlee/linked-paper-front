export type DefaultValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];

export type DefaultItemValue = DefaultValue | { [key: string]: DefaultValue };

export type Item<T extends DefaultItemValue = DefaultItemValue> = {
  itemID: string;
  itemValue: T;
};

export interface Scheme<
  K extends (typeof Attributes)[keyof typeof Attributes],
  T,
> {
  type: K;
  value?: T;
}

const Attributes = {
  Field: "field",
  Check: "check",
  Select: "select",
  MultiSelect: "multi_select",
  NumberRange: "num_range",
  DataRange: "data_range",
} as const;

export const { Field, Check, DataRange, MultiSelect, NumberRange, Select } =
  Attributes;

export type Field = Scheme<typeof Field, DefaultValue>;
export type Check = Scheme<typeof Check, boolean>;
export type Select<T extends DefaultItemValue = DefaultItemValue> = Scheme<
  typeof Select,
  Item<T>
>;
export type MultiSelect<T extends DefaultItemValue = DefaultItemValue> = Scheme<
  typeof MultiSelect,
  Record<string, Item<T>>
>;
export type NumberRange = Scheme<
  typeof NumberRange,
  { min?: number; max?: number }
>;
export type DataRange<T extends string = string> = Scheme<
  typeof DataRange,
  { min?: T; max?: T }
>;

export type Type =
  | Field
  | Select
  | MultiSelect
  | Check
  | NumberRange
  | DataRange;

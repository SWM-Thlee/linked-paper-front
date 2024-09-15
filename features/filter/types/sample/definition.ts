import { FilterAttribute } from "../attribute";
import { BaseData, BaseFilter } from "../base";

export const Type = "sample";
export type Type = typeof Type;

export type Data = BaseData<Type> & {
  attributes: {
    attr_check: FilterAttribute.Check;
    attr_data_range: FilterAttribute.DataRange;
    attr_field: FilterAttribute.Field;
    attr_multi_select: FilterAttribute.MultiSelect;
    attr_number_range: FilterAttribute.NumberRange;
    attr_select: FilterAttribute.Select;
  };
};

export type Filter = BaseFilter<Type, Data>;

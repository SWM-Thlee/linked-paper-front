import * as Attribute from "../types/attribute";
import { BaseData, BaseFilter } from "../types/base";

export const Type = "sample";
export type Type = typeof Type;

export type Data = BaseData<Type> & {
  attributes: {
    attr_check: Attribute.Check;
    attr_data_range: Attribute.DataRange;
    attr_category: Attribute.Category;
    attr_multi_select: Attribute.MultiSelect;
    attr_number_range: Attribute.NumberRange;
    attr_select: Attribute.Select;
  };
};

export type Filter = BaseFilter<Type, Data>;

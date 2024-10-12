import * as Attribute from "./attribute";
import * as Base from "./base";

export const Type = "sample";
export type Type = typeof Type;

export type Data = Base.Data<Type> & {
  attributes: {
    attr_check: Attribute.Check;
    attr_data_range: Attribute.DataRange;
    attr_field: Attribute.Field;
    attr_multi_select: Attribute.MultiSelect;
    attr_number_range: Attribute.NumberRange;
    attr_select: Attribute.Select;
  };
};

export type Filters = Base.Filters<Type, Data>;

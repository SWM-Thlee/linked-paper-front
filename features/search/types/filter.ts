import { Attribute } from "@/features/filter/types";
import { BaseData, BaseFilter } from "@/features/filter/types/base";

export const Type = "semantic-search";
export type Type = typeof Type;

export type Data = BaseData<Type> & {
  attributes: {
    /** { JournalID: [Journal] } */
    journal: Attribute.MultiSelect;

    /** { CategoryID: [CategoryID] } */
    category: Attribute.MultiSelect;

    /** YYYY-MM-DD */
    date: Attribute.DataRange;
  };
};

export type Filter = BaseFilter<Type, Data>;

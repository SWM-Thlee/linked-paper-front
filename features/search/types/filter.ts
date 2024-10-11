import * as FilterAttribute from "@/features/filter/types/attribute";
import * as FilterBase from "@/features/filter/types/base";

export const Type = "semantic-search";
export type Type = typeof Type;

export type Journal = {
  /** Journal의 이름을 고유 값으로 지정합니다. */
  nameOfJournal: string;
};

export function Journal(journals: string[]): Data["attributes"]["journal"] {
  return {
    type: FilterAttribute.MultiSelect,
    value: journals.reduce<Record<string, FilterAttribute.Item<Journal>>>(
      (result, journal) => ({
        ...result,
        [journal]: { itemID: journal, itemValue: { nameOfJournal: journal } },
      }),
      {},
    ),
  };
}

export type Category = {
  /** Category의 고유 ID를 나타냅니다. */
  categoryID: string;
};

export function Category(categories: string[]): Data["attributes"]["category"] {
  return {
    type: FilterAttribute.MultiSelect,
    value: categories.reduce<Record<string, FilterAttribute.Item<Category>>>(
      (result, category) => ({
        ...result,
        [category]: { itemID: category, itemValue: { categoryID: category } },
      }),
      {},
    ),
  };
}

export type Data = FilterBase.Data<Type> & {
  attributes: {
    journal: FilterAttribute.MultiSelect<Journal>;
    category: FilterAttribute.MultiSelect<Category>;
    date: FilterAttribute.DataRange;
  };
};

export type DataID = Data["dataID"];

export type Attribute = keyof Data["attributes"];

export type Filters = FilterBase.Filters<Type, Data>;

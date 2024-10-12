import { generateFilterDataID } from "@/features/filter/utils/id";
import { Filter } from "@/features/filter/types";
import { Search } from "../../types";

export default function createSearchFilter({
  tags,
  name,
}: {
  tags: Search.Filter.Data["tags"];
  name: Search.Filter.Data["name"];
}): Search.Filter.Data {
  return {
    tags,
    name,
    featureID: Search.Filter.Type,
    dataID: generateFilterDataID(Search.Filter.Type),
    attributes: {
      // 초기 값은 모두 빈 값으로 초기화됩니다.
      date: { type: Filter.Attribute.DataRange },
      category: { type: Filter.Attribute.MultiSelect },
      journal: { type: Filter.Attribute.MultiSelect },
    },
  };
}

import { Attributes } from "@/features/filter/types/attribute";
import { generateFilterDataID } from "@/features/filter/utils/id";
import { Search } from "../../types";

export default function createSearchFilter({
  tags,
  name,
}: {
  tags: Search.Data["tags"];
  name: Search.Data["name"];
}): Search.Data {
  return {
    tags,
    name,
    featureID: Search.Type,
    dataID: generateFilterDataID(Search.Type),
    attributes: {
      // 초기 값은 모두 빈 값으로 초기화됩니다.
      date: { type: Attributes.DATA_RANGE },
      category: { type: Attributes.MULTI_SELECT },
      journal: { type: Attributes.MULTI_SELECT },
    },
  };
}

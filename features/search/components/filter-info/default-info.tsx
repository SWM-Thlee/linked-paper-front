import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { PresetSearchFilterInfo } from "@/features/search/components/filter-info/preset-info";
import BackToPresetOption from "./filter-option/back-to-preset";
import { Search } from "../../types";

// TODO: FilterStore와 FilterData 간의 관계가 정립되어 있지 않다.
export const DefaultSearchFilterInfo = CustomizedFilterInfo<Search.Filter.Type>(
  {
    extend: PresetSearchFilterInfo,
    options(filter, store) {
      return (
        <>
          <BackToPresetOption dataID={filter.dataID} />
          {PresetSearchFilterInfo.attributes.options?.(filter, store)}
        </>
      );
    },
  },
);

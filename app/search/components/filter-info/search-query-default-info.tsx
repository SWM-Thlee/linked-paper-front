import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { DefaultSearchFilterInfo } from "@/features/search/components/filter-info/default-info";
import ApplyToSearchOption from "@/features/search/components/filter-info/filter-option/apply-to-search";
import { Search } from "@/features/search/types";

export const SearchQueryDefaultFilterInfo = CustomizedFilterInfo<Search.Type>({
  extend: DefaultSearchFilterInfo,
  options(filter, store) {
    return (
      <>
        <ApplyToSearchOption dataID={filter.dataID} store={store} />
        {DefaultSearchFilterInfo.attributes.options?.(filter, store)}
      </>
    );
  },
});

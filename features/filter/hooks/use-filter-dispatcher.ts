import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { FilterData, FilterFeatureID } from "../types/filter";
import { FilterStore } from "../types/store";
import { Dispatcher } from "../stores";

type Props<T extends FilterFeatureID> = {
  featureID: T;
  store?: FilterStore;
};

export default function useFilterDispatcher<T extends FilterFeatureID>({
  featureID,
  store = FilterStore.PERSIST,
}: Props<T>) {
  const dispatcher = useSetAtom(Dispatcher[store](featureID));

  return useCallback(
    (data: FilterData<T>) => {
      if (data.featureID !== featureID)
        throw new Error("Error from FilterDispather: Feature missmatched.");
      dispatcher(data);
    },
    [featureID, dispatcher],
  );
}

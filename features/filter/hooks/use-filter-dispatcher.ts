import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { AtomDispatcher } from "../stores";
import { Filter } from "../types";

type Props<T extends Filter.Build.FeatureID> = {
  featureID: T;
  store?: Filter.Store.Type;
};

export default function useFilterDispatcher<T extends Filter.Build.FeatureID>({
  featureID,
  store = Filter.Store.PERSIST,
}: Props<T>) {
  const dispatcher = useSetAtom(AtomDispatcher[store](featureID));

  return useCallback(
    (data: Filter.Build.Data<T>) => {
      if (data.featureID !== featureID)
        throw new Error("Error from FilterDispather: Feature missmatched.");
      dispatcher(data);
    },
    [featureID, dispatcher],
  );
}

import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useDeepCompareMemo } from "use-deep-compare";

import { AtomFilters } from "../stores";
import { Filter } from "../types";

type Props<T extends Filter.Build.FeatureID> = {
  featureID: T;
  store?: Filter.Store.Type;
  track?: Filter.Identify.Strategy<T>;
};

export default function useFilters<T extends Filter.Build.FeatureID>({
  featureID,
  store = Filter.Store.PERSIST,
  track,
}: Props<T>) {
  // Deep Compare for Checking Dependencies
  const info = useDeepCompareMemo<Filter.Identify.Strategy<T>>(
    () => ({ tag: track?.tag, dataID: track?.dataID }),
    [track?.tag, track?.dataID],
  );

  const [filters, setFilters] = useAtom(AtomFilters[store]<T>(featureID, info));

  // 대상 Filter의 개수를 나타냅니다.
  const length = useMemo(() => Object.keys(filters).length, [filters]);

  // 만약 Filter가 하나만 존재하는 경우 바로 가져올 수 있도록 합니다.
  // Filter가 존재하지 않거나 두 개 이상인 경우 null을 반환합니다.
  const filter = useMemo<Filter.Build.Data<T> | null>(
    () => (length !== 1 ? null : Object.values(filters)[0]),
    [length, filters],
  );

  // 대상 Filter를 모두 삭제합니다.
  const reset = useCallback(() => setFilters(RESET), [setFilters]);

  return { filters, filter, reset, length };
}

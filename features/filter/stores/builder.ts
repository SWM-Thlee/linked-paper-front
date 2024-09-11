import { useMemo } from "react";
import { atom, PrimitiveAtom } from "jotai";
import { RESET } from "jotai/utils";
import { Filter, FilterData, FilterFeatureID } from "../types/filter";
import { FilterTrackingStrategy } from "../types/track";

function resolve<T extends FilterFeatureID>(
  include: boolean,
  featureID: T,
  filters: Filter,
  track?: FilterTrackingStrategy<T>,
) {
  return Object.entries(filters[featureID]).reduce<Filter[T]>(
    (result, [dataID, data]) => {
      // 1. DataID를 여러 개 제시한 경우 OR로 간주합니다.
      const checkDataID =
        !track?.dataID || track.dataID.some((i) => i === dataID);
      // 2. Tag를 여러 개 제시한 경우 AND로 간주합니다.
      const checkTag =
        !track?.tag ||
        track.tag.every((t) => {
          // string: 해당 Tag의 존재 여부만 판단합니다. (INCLUDE)
          if (typeof t === "string") {
            return (data as FilterData<T>).tags[t];
          }

          // [string]: 해당 Tag가 존재하지 않아야 합니다. (EXCLUDE)
          if (t.length === 1) {
            return !(data as FilterData<T>).tags[t[0]];
          }

          // [string, FilterTag[string]]: 특정 Tag 내 세부 정보와 모두 일치하여야 합니다. (INCLUDE)
          const [tag, extra] = t;
          const origin = (data as FilterData<T>).tags[tag] ?? {};

          return Object.keys(extra).every((key) => origin[key] === extra[key]);
        });

      const validToTrack = checkDataID && checkTag;

      return (include && validToTrack) || (!include && !validToTrack)
        ? { ...result, [dataID]: data }
        : result;
    },
    {},
  );
}

// F1. Dispatcher (Filter Write-Only)
export function dispatcherAtomBuilder(atomTarget: PrimitiveAtom<Filter>) {
  return <T extends FilterFeatureID>(featureID: T) =>
    useMemo(
      () =>
        atom(null, (get, set, value: FilterData<T>) => {
          const filters = get(atomTarget);

          set(atomTarget, {
            ...filters,
            [featureID]: { ...filters[featureID], [value.dataID]: value },
          });
        }),
      [featureID],
    );
}

// F2. Filters (Trackable, Read & Write)
// 주의: track object는 useMemo 등을 통해 별도로 감싸야 합니다.
export function filtersAtomBuilder(atomTarget: PrimitiveAtom<Filter>) {
  return <T extends FilterFeatureID>(
    featureID: T,
    track?: FilterTrackingStrategy<T>,
  ) =>
    useMemo(
      () =>
        atom(
          (get) => resolve(true, featureID, get(atomTarget), track),
          (get, set, value: typeof RESET) => {
            if (value !== RESET) return;

            const filters = get(atomTarget);

            set(atomTarget, {
              ...filters,
              [featureID]: resolve(false, featureID, filters, track),
            });
          },
        ),
      [featureID, track],
    );
}

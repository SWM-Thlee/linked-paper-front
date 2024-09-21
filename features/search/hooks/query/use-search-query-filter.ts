import { useAtomValue } from "jotai";
import { queryFilterAtom } from "../../stores/query";

export default function useSearchQueryFilter() {
  return useAtomValue(queryFilterAtom);
}

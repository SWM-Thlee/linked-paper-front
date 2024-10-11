import { useAtomValue } from "jotai";
import {
  queryAtom,
  queryStaleAtom,
  requiredQueryAtom,
} from "../../stores/query";

export default function useSearchQueryInfo() {
  const stale = useAtomValue(queryStaleAtom);
  const requiredQuery = useAtomValue(requiredQueryAtom);
  const query = useAtomValue(queryAtom);

  return { query, requiredQuery, stale };
}

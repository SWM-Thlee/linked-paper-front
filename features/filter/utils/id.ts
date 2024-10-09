import { signature } from "@/utils/signature";
import { FilterData, FilterFeatureID } from "../types/filter";

export function generateFilterDataID<T extends FilterFeatureID>(
  featureID: T,
): FilterData<T>["dataID"] {
  return `${featureID}-${signature()}`;
}

import { signature } from "@/utils/signature";
import { Filter } from "../types";

export function generateFilterDataID<T extends Filter.Build.FeatureID>(
  featureID: T,
): Filter.Build.Data<T>["dataID"] {
  return `${featureID}-${signature()}`;
}

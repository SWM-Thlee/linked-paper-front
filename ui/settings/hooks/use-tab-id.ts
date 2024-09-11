import { useRef } from "react";
import { signature } from "@/utils/signature";
import { TabID } from "../types";

export default function useTabID(name: string) {
  return useRef<TabID>(`tab-${name}-${signature()}`).current;
}

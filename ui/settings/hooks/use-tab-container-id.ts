import { useRef } from "react";
import { signature } from "@/utils/signature";
import { TabContainerID } from "../types";

export default function useTabContainerID() {
  return useRef<TabContainerID>(`tabcontainer-${signature()}`).current;
}

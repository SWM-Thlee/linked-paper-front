import { useRef } from "react";
import { signature } from "@/utils/signature";
import { GroupContainerID } from "../types";

export default function useGroupContainerID(name: string) {
  return useRef<GroupContainerID>(`groupcontainer-${name}-${signature()}`)
    .current;
}

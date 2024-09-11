import { useRef } from "react";
import { signature } from "@/utils/signature";
import { OptionContainerID } from "../types";

export default function useOptionContainerID() {
  return useRef<OptionContainerID>(`optioncontainer-${signature()}`).current;
}

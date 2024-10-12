import { useContext } from "react";
import { TabContext } from "../context";

export default function useTab() {
  return useContext(TabContext);
}

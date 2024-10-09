import { useContext } from "react";
import { SettingsContainerContext } from "../context";

export default function useSettings() {
  return useContext(SettingsContainerContext);
}

import { createContext } from "react";
import { DEFAULT_TICK } from "./const";

type CompletionContext = {
  onTrigger: (trigger: (query: string) => void, name?: string) => void;
  currentQuery: string;
  tick: number;
  requestQuery: (query: string) => void;
  setTick: (tick: number) => void;
};

export const CompletionContext = createContext<CompletionContext>({
  onTrigger: () => {},
  currentQuery: "",
  tick: DEFAULT_TICK,
  requestQuery: () => {},
  setTick: () => {},
});

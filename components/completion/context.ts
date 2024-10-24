import { createContext } from "react";
import { DEFAULT_TICK } from "./const";

type CompletionContext = {
  currentQuery: string;
  tick: number;
  requestQuery: (query: string) => void;
  setTick: (tick: number) => void;
};

export const CompletionContext = createContext<CompletionContext>({
  currentQuery: "",
  tick: DEFAULT_TICK,
  requestQuery: () => {},
  setTick: () => {},
});

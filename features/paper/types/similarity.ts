import { Id } from "./scheme";

export type Store = {
  [paperID: Id]: {
    [paperID: Id]: number;
  };
};

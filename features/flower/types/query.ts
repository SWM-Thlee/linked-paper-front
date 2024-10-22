import { Paper } from "@/features/paper/types";

export type Info = {
  paperID: Paper.Scheme.Id;
};

export type Params = {
  id?: Paper.Scheme.Id;
};

export const PaperParam = "id";

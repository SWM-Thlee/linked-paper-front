import {
  ConvertingEditProps,
  revertEdit,
  RevertingEditProps,
  toEdit,
} from "@/features/filter/utils/converter/edit";
import { Search } from "../../types";

export interface SearchTagEdit {
  titleEditable: boolean;
}

export type ConvertingSearchEditProps = ConvertingEditProps<Search.Type> & {
  titleEditable: boolean;
};

export function toSearchEdit({
  data,
  store,
  branch,
  extra,
  titleEditable,
}: ConvertingSearchEditProps) {
  return toEdit<Search.Type>({
    data,
    store,
    branch,
    extra: { titleEditable, ...extra },
  });
}

export type RevertingSearchEditProps = RevertingEditProps<Search.Type>;

export function revertSearchEdit({ data, branch }: RevertingSearchEditProps) {
  return revertEdit<Search.Type>({ data, branch });
}

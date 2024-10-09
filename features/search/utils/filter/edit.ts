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

export type ConvertingSearchEditProps =
  ConvertingEditProps<Search.Filter.Type> & {
    titleEditable: boolean;
  };

export function toSearchEdit({
  data,
  store,
  branch,
  extra,
  titleEditable,
}: ConvertingSearchEditProps) {
  return toEdit<Search.Filter.Type>({
    data,
    store,
    branch,
    extra: { titleEditable, ...extra },
  });
}

export type RevertingSearchEditProps = RevertingEditProps<Search.Filter.Type>;

export function revertSearchEdit({ data, branch }: RevertingSearchEditProps) {
  return revertEdit<Search.Filter.Type>({ data, branch });
}

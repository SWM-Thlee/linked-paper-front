"use client";

import { Search } from "@/features/search/types";
import { FilterDataID } from "@/features/filter/types/filter";
import TextField from "@/ui/text-field";
import { FilterStore } from "@/features/filter/types/store";
import useBidirectionalState from "@/hooks/use-bidirectional-state";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import FieldContainer from "@/ui/container/field-container";

type Props = {
  dataID: FilterDataID<Search.Type>;
  store: FilterStore;
};

export default function EditTitleOption({ dataID, store }: Props) {
  const { editor, patch } = useSearchFilterEditor({
    store,
    dataID,
  });

  const [text, setText] = useBidirectionalState(
    editor?.name ?? "",
    editor?.name,
    (data) =>
      patch((draft) => {
        draft.name = data;
      }),
  );

  return (
    <FieldContainer title="TITLE" ui_size="medium">
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        ui_size="medium"
        ui_color="secondary"
      />
    </FieldContainer>
  );
}

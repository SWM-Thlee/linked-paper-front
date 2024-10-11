"use client";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import TextField from "@/ui/text-field";
import useBidirectionalState from "@/hooks/use-bidirectional-state";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import FieldContainer from "@/ui/container/field-container";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
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

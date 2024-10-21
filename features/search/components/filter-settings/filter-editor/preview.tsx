"use client";

import { useCallback, useContext } from "react";

import { Settings } from "@/ui/settings";
import OverviewIcon from "@/ui/icons/overview";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import CheckIcon from "@/ui/icons/check";
import CloseIcon from "@/ui/icons/close";
import RestoreIcon from "@/ui/icons/restore";
import LabelButton from "@/ui/label-button";
import useSettings from "@/ui/settings/hooks/use-settings-container";
import useTabDirectionObserver from "@/ui/settings/hooks/use-tab-direction-observer";
import { Search } from "@/features/search/types";
import { EditorContext } from "./context";
import { EditSearchFilterInfo } from "../../filter-info/edit-info";

export default function EditorPreview() {
  const tabID = useTabID(Search.Settings.PREVIEW.ID);
  const settings = useSettings();
  const edit = useContext(EditorContext);

  // 이 Tab으로 이동하는 요청을 받습니다.
  useTabDirectionObserver(
    Search.Settings.PREVIEW.ID,
    tabID,
    edit?.filter?.dataID,
  );

  const backToPreview = useCallback(() => {
    settings.setTabID(null);
  }, [settings]);

  return edit?.editor && edit.filter ? (
    <Settings.Tab.Root
      name={Search.Settings.PREVIEW.ID}
      id={tabID}
      title={`Edit: ${edit.editor.name ?? "Unknown"}`}
      description={`Edit the filter "${edit.editor.name ?? "Unknown"}" in this group.`}
    >
      <Settings.Tab.Title>
        <div className="flex items-center gap-4">
          <OverviewIcon ui_size="small" /> Preview
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div className="mt-8 flex flex-col gap-16">
          <EditSearchFilterInfo store={edit.store} data={edit.filter} />
        </div>
      </Settings.Tab.Content>
      <Settings.Tab.Options>
        {edit.isModified && (
          <>
            <LabelButton
              onClick={() => {
                edit.apply(true);
                backToPreview();
              }}
            >
              <CheckIcon ui_size="small" />
              Save
            </LabelButton>
            <LabelButton ui_color="secondary" onClick={() => edit.reset()}>
              <RestoreIcon ui_size="small" />
              Set Defaults
            </LabelButton>
          </>
        )}

        <LabelButton
          ui_color="tertiary"
          onClick={() => {
            edit.remove();
            backToPreview();
          }}
        >
          <CloseIcon ui_size="small" />
          Cancel Edit
        </LabelButton>
      </Settings.Tab.Options>
    </Settings.Tab.Root>
  ) : null;
}

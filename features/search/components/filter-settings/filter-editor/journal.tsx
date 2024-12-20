"use client";

import { useCallback, useContext, useMemo, useState } from "react";

import CheckIcon from "@/ui/icons/check";
import RestoreIcon from "@/ui/icons/restore";
import { Settings } from "@/ui/settings";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import CheckBox from "@/ui/check-box";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import useBidirectionalState from "@/hooks/use-bidirectional-state";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useJournals from "@/features/paper/hooks/use-journals";
import JournalIcon from "@/ui/icons/journal";
import { matches } from "@/features/search/utils/matcher";
import LabelButton from "@/ui/label-button";
import useSettings from "@/ui/settings/hooks/use-settings-container";
import { Search } from "@/features/search/types";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import { Analytics } from "@/features/analytics/types";
import { EditorContext } from "./context";

function JournalElement({ journal }: { journal: string }) {
  const edit = useContext(EditorContext);
  const journals = edit?.editor?.attributes.journal.value;

  const [selected, setSelected] = useBidirectionalState(
    !!journals?.[journal],
    !!journals?.[journal],
    (data) =>
      edit?.patch((draft) => {
        if (data) {
          if (!draft.attributes.journal.value) {
            draft.attributes.journal.value = {
              [journal]: {
                itemID: journal,
                itemValue: { nameOfJournal: journal },
              },
            };
          } else {
            draft.attributes.journal.value[journal] = {
              itemID: journal,
              itemValue: { nameOfJournal: journal },
            };
          }
        } else if (draft.attributes.journal.value?.[journal]) {
          delete draft.attributes.journal.value[journal];
        }
      }),
  );

  return (
    <div key={journal} className="flex items-center gap-4">
      <CheckBox
        checked={selected}
        onCheckedChange={(checked) => setSelected(checked !== false)}
      />
      <div className="flex flex-1 items-center break-keep">
        <div className="text-title-medium">{journal}</div>
      </div>
    </div>
  );
}

export default function EditorJournal() {
  const { log } = useAnalytics();
  const tabID = useTabID(Search.Settings.JOURNAL.ID);
  const edit = useContext(EditorContext);
  const settings = useSettings();

  const { journals } = useJournals();

  const [text, setText] = useState("");
  const [checkedOnly, setCheckedOnly] = useState(false);

  const result = useMemo(
    () =>
      journals.filter((journal) =>
        matches({ target: journal, include: [text] }),
      ),
    [journals, text],
  );

  const selection = useMemo(
    () =>
      result.filter(
        (journal) =>
          !checkedOnly ||
          (checkedOnly && edit?.editor?.attributes.journal.value?.[journal]),
      ),
    [result, checkedOnly, edit?.editor?.attributes.journal.value],
  );

  const selectAll = useCallback(() => {
    edit?.patch((draft) => {
      draft.attributes.journal.value = journals.reduce(
        (total, journal) => ({
          ...total,
          [journal]: {
            itemID: journal,
            itemValue: { nameOfJournal: journal },
          },
        }),
        {},
      );
    });
  }, [edit, journals]);

  const unselectAll = useCallback(() => {
    edit?.patch((draft) => {
      draft.attributes.journal.value = {};
    });
  }, [edit]);

  const backToPreview = useCallback(() => {
    settings.setTabID(null);
  }, [settings]);

  /* User Event: Filter의 수정 사항을 적용합니다. */
  const onModifyFilter = useCallback(() => {
    const target = edit?.editor;

    if (!target) return;

    log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(target));
    edit?.apply(true);

    backToPreview();
  }, [edit, backToPreview, log]);

  // TODO: 이후에 각 Subject를 열고 닫을 수 있도록 (TreeView) 추가해보자.
  return (
    <Settings.Tab.Root
      name={Search.Settings.JOURNAL.ID}
      id={tabID}
      title={Search.Settings.JOURNAL.TITLE}
      description={Search.Settings.JOURNAL.DESCRIPTION}
    >
      <Settings.Tab.Title>
        <div className="flex items-center gap-4">
          <JournalIcon ui_size="small" /> Source
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div className="mb-16 mt-8 flex flex-col gap-8 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckBox
                  checked={checkedOnly}
                  onCheckedChange={(checked) =>
                    setCheckedOnly(checked !== false)
                  }
                />
                Selected Only
              </div>
              <div className="flex gap-2">
                <Button
                  ui_color="secondary"
                  ui_variant="light"
                  ui_size="small"
                  onClick={selectAll}
                >
                  Select All
                </Button>
                <Button
                  ui_color="secondary"
                  ui_variant="light"
                  ui_size="small"
                  onClick={unselectAll}
                >
                  Unselect All
                </Button>
              </div>
            </div>
            <SearchField
              value={text}
              onChange={(e) => setText(e.target.value)}
              ui_color="tertiary"
              ui_size="medium"
              disableSubmit
            />
            <div className="flex flex-col gap-4 overflow-y-auto rounded-2 p-4 ring-2 ring-inset ring-light-outlineVariant scrollbar dark:ring-dark-outlineVariant">
              {selection.map((journal) => (
                <JournalElement key={journal} journal={journal} />
              ))}
            </div>
          </div>
        </div>
      </Settings.Tab.Content>
      <Settings.Tab.Options>
        {edit?.isModified && (
          <>
            <LabelButton onClick={onModifyFilter}>
              <CheckIcon ui_size="small" />
              Save
            </LabelButton>
            <LabelButton
              ui_color="secondary"
              onClick={() => edit?.reset({ attributes: ["journal"] })}
            >
              <RestoreIcon ui_size="small" />
              Set Journal to Defaults
            </LabelButton>
          </>
        )}
      </Settings.Tab.Options>
    </Settings.Tab.Root>
  );
}

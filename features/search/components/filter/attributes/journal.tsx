"use client";

import { useCallback, useMemo, useState } from "react";
import { produce } from "immer";

import SearchField from "@/ui/search-field";
import CheckBox from "@/ui/check-box";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useJournals from "@/features/paper/hooks/use-journals";
import useFilters from "@/features/filter/hooks/use-filters";
import { matches } from "@/features/search/utils/matcher";
import { Analytics } from "@/features/analytics/types";
import { Search } from "@/features/search/types";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import CheckIcon from "@/ui/icons/check";
import CloseIcon from "@/ui/icons/close";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import LabelButton from "@/ui/label-button";
import { FILTER_SETTINGS_ID, JOURNAL_SECTION_ID } from "../section-id";

export default function JournalSection({
  data,
}: {
  data: Search.Filter.Scheme;
}) {
  const { log } = useAnalytics();
  const { dispatch } = useFilters();
  const { journals } = useJournals();

  const [text, setText] = useState("");
  const [checkedOnly, setCheckedOnly] = useState(false);

  const {
    attributes: { journal: selectedJournals },
  } = data;

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
        (journal) => !checkedOnly || selectedJournals.includes(journal),
      ),
    [result, checkedOnly, selectedJournals],
  );

  const selectAll = useCallback(() => {
    const newFilter = produce(data, (draft) => {
      draft.attributes.journal = journals;
    });

    dispatch(newFilter);
    log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
  }, [dispatch, data, journals, log]);

  const select = useCallback(
    (journal: string) => {
      const newFilter = produce(data, (draft) => {
        draft.attributes.journal = draft.attributes.journal
          .filter((j) => j !== journal)
          .concat(journal);
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, data, log],
  );

  const unselect = useCallback(
    (journal: string) => {
      const newFilter = produce(data, (draft) => {
        draft.attributes.journal = draft.attributes.journal.filter(
          (j) => j !== journal,
        );
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, data, log],
  );

  const unselectAll = useCallback(() => {
    const newFilter = produce(data, (draft) => {
      draft.attributes.journal = [];
    });

    dispatch(newFilter);
    log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
  }, [dispatch, data, log]);

  return (
    <div className="flex scroll-m-5 flex-col gap-6" id={JOURNAL_SECTION_ID}>
      <div className="sticky top-0 flex h-[3rem] items-center gap-4 rounded-2 bg-light-secondaryContainer/75 p-2 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer/75 dark:text-dark-onSecondaryContainer">
        <button
          type="button"
          aria-label="Scroll to Filter Settings"
          onClick={() =>
            document
              .getElementById(FILTER_SETTINGS_ID)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <ArrowBackIcon />
        </button>
        <span className="text-label-large">Source Settings</span>
      </div>
      <div className="flex flex-col gap-4">
        <SearchField
          value={text}
          onChange={(e) => setText(e.target.value)}
          ui_color="tertiary"
          ui_size="small"
          disableSubmit
        />
        <div className="flex items-center justify-end gap-2">
          <LabelButton
            ui_variant={checkedOnly ? "default" : "bordered"}
            ui_color="tertiary"
            ui_size="small"
            onClick={() => setCheckedOnly((prev) => !prev)}
            className="flex items-center gap-2"
          >
            {checkedOnly ? <CheckIcon /> : <CloseIcon />}
            <span>View Selected</span>
          </LabelButton>
          <LabelButton
            ui_color="secondary"
            ui_variant="light"
            ui_size="small"
            onClick={selectAll}
          >
            Select All
          </LabelButton>
          <LabelButton
            ui_color="secondary"
            ui_variant="light"
            ui_size="small"
            onClick={unselectAll}
          >
            Unselect All
          </LabelButton>
        </div>
      </div>
      <div className="flex min-h-[50vh] flex-col gap-4 rounded-2 p-4 ring-2 ring-inset ring-light-outlineVariant scrollbar dark:ring-dark-outlineVariant">
        {selection.map((journal) => (
          <div key={journal} className="flex items-center gap-4">
            <CheckBox
              checked={selectedJournals.includes(journal)}
              onCheckedChange={(checked) =>
                checked !== false ? select(journal) : unselect(journal)
              }
            />
            <div className="flex flex-1 items-center break-keep">
              <div className="text-body-medium">{journal}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";

import { Popover } from "@/ui/popover";

import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";
import ReferenceIcon from "@/ui/icons/reference";
import CitationIcon from "@/ui/icons/citation";
import CopyIcon from "@/ui/icons/copy";
import { copyToClipboard } from "@/utils/clipboard";

export interface OthersChipProps {
  date: string;
  referenceCount: number;
  citationCount: number;
}

export default function OthersChip({
  date,
  referenceCount,
  citationCount,
}: OthersChipProps) {
  const copy = useCallback(
    (text: string) =>
      copyToClipboard(text, (success) => {
        if (success) {
          toast.success(`Copy: ${text}`);
        } else {
          toast.error(`Failed to Copy: ${text}`);
        }
      }),
    [],
  );

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_variant="light">
          <DateIcon ui_size="small" />
          <span>{date}</span>
          <SpliterIcon />
          <CitationIcon ui_size="small" />
          <span>{citationCount}</span>
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col">
          <Button
            ui_color="secondary"
            ui_size="small"
            ui_variant="ghost"
            className="group/date flex items-center justify-between gap-24"
            onClick={() => copy(date)}
          >
            <div className="flex items-center gap-2">
              <DateIcon ui_size="small" className="group-hover/date:hidden" />
              <CopyIcon
                ui_size="small"
                className="hidden group-hover/date:block"
              />
              <span>Date</span>
            </div>
            <div className="text-label-large">{date}</div>
          </Button>
          <Button
            ui_color="secondary"
            ui_size="small"
            ui_variant="ghost"
            className="group/reference flex items-center justify-between gap-24"
            onClick={() => copy(referenceCount.toString())}
          >
            <div className="flex items-center gap-2">
              <ReferenceIcon
                ui_size="small"
                className="group-hover/reference:hidden"
              />
              <CopyIcon
                ui_size="small"
                className="hidden group-hover/reference:block"
              />
              <span>Reference</span>
            </div>
            <div className="text-label-large">{referenceCount}</div>
          </Button>
          <Button
            ui_color="secondary"
            ui_size="small"
            ui_variant="ghost"
            className="group/citation flex items-center justify-between gap-24"
            onClick={() => copy(citationCount.toString())}
          >
            <div className="flex items-center gap-2">
              <CitationIcon
                ui_size="small"
                className="group-hover/citation:hidden"
              />
              <CopyIcon
                ui_size="small"
                className="hidden group-hover/citation:block"
              />
              <span>Citation</span>
            </div>
            <div className="text-label-large">{citationCount}</div>
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

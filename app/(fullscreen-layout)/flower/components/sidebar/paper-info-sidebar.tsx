"use client";

import React from "react";

import Badge from "@/ui/badge";
import IconButton from "@/ui/icon-button";
import CloseIcon from "@/ui/icons/close";
import { Paper } from "@/features/paper/types";
import AuthorChip from "@/features/search/components/chip/author";
import { CategoryChip } from "@/features/search/components/chip/category";
import OthersChip from "@/features/search/components/chip/others";
import SearchResultOriginLink from "@/app/(scrollable-layout)/search/components/result-item/links/origin";
import SearchResultPdfLink from "@/app/(scrollable-layout)/search/components/result-item/links/pdf";
import SidebarContainer from "@/features/graph/components/sidebar/sidebar-container";

type Props = {
  paper: Paper.Scheme.Metadata | null;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function PaperInfoSidebar({ paper, onClose, children }: Props) {
  return (
    <SidebarContainer>
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex w-full items-center justify-end p-8">
        <IconButton onClick={onClose} className="pointer-events-auto">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="flex max-h-[80vh] flex-col gap-8 overflow-y-auto p-8 scrollbar-none">
        {/* Header */}
        <div className="flex items-center gap-2">
          {paper?.link.origin_link && (
            <SearchResultOriginLink origin_link={paper?.link.origin_link} />
          )}
          {paper?.link.pdf_link && (
            <SearchResultPdfLink pdf_link={paper?.link.pdf_link} />
          )}
          {children}
        </div>
        {/* Content */}
        {paper && (
          <>
            <div className="text-headline-small">{paper.title}</div>
            <div className="flex flex-wrap items-center gap-2">
              <AuthorChip authors={paper.authors} />
              <CategoryChip categoryIDs={paper.categories} />
              <OthersChip {...paper} />
            </div>
            <div className="flex flex-col gap-4">
              <Badge ui_color="secondary" className="self-start">
                ABSTRACTION
              </Badge>
              <div className="text-body-large text-lg leading-loose tracking-wider">
                {paper.abstraction}
              </div>
            </div>
          </>
        )}
      </div>
    </SidebarContainer>
  );
}

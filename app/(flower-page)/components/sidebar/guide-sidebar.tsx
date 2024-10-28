"use client";

import SidebarContainer from "@/features/graph/components/sidebar/sidebar-container";
import Badge from "@/ui/badge";
import ArrowForwardIcon from "@/ui/icons/arrow-forward";
import QuestionIcon from "@/ui/icons/question";

type Props = {
  onClose: () => void;
};

export default function GuideSidebar({ onClose }: Props) {
  return (
    <SidebarContainer
      title={
        <div className="flex items-center gap-2">
          <QuestionIcon ui_size="small" />
          <div className="select-none text-title-medium">Guide</div>
        </div>
      }
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 text-label-large text-light-onSurface dark:text-dark-onSurface">
        <div className="flex items-center gap-1">
          <Badge ui_color="secondary">Click</Badge>
          <Badge>Root Node</Badge>
          <ArrowForwardIcon ui_size="small" />
          <div>Focus & Paper Information</div>
        </div>
        <div className="flex items-center gap-1">
          <Badge ui_color="secondary">Click</Badge>
          <Badge ui_color="tertiary">Child Node</Badge>
          <ArrowForwardIcon ui_size="small" />
          <div>Create a New Related Graph</div>
        </div>
        <div className="flex items-center gap-1">
          <Badge ui_color="secondary">Right Click</Badge>
          <Badge ui_color="secondary">Node</Badge>
          <ArrowForwardIcon ui_size="small" />
          <div>Paper Information</div>
        </div>
      </div>
    </SidebarContainer>
  );
}

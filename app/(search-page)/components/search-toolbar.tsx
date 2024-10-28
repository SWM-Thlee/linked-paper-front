"use client";

import Feedback from "@/features/feedback/components/feedback";
import Toolbar from "@/components/toolbar";
import ToolbarContainer from "@/components/toolbar/toolbar-container";
import FeedbackIcon from "@/ui/icons/feedback";
import LabelButton from "@/ui/label-button";

export default function SearchToolbar() {
  return (
    <Toolbar>
      <div className="absolute bottom-0 right-0">
        <ToolbarContainer>
          <Feedback>
            <LabelButton ui_color="secondary" ui_variant="ghost">
              <FeedbackIcon ui_size="small" /> Feedback
            </LabelButton>
          </Feedback>
        </ToolbarContainer>
      </div>
    </Toolbar>
  );
}

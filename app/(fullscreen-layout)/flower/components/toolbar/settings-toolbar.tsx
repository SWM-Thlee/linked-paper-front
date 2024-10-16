import { useCallback, useMemo } from "react";

import LabelButton from "@/ui/label-button";
import CheckIcon from "@/ui/icons/check";
import { Graph } from "@/features/graph/types";
import { merge } from "@/utils/merge";
import CloseIcon from "@/ui/icons/close";
import ToolbarContainer from "./toolbar-container";

type Props = {
  viewConfig: Graph.Config.View;
  setExtraConfig: (
    fn: (prevPatcher: Graph.Config.ViewPatcher) => Graph.Config.ViewPatcher,
  ) => void;
};

export default function SettingsToolbar({ viewConfig, setExtraConfig }: Props) {
  const isAdjacentLinkOnly = useMemo(
    () => viewConfig.panel.linkOfAdjacentRootNodeOnly,
    [viewConfig.panel.linkOfAdjacentRootNodeOnly],
  );
  const setAdjacentLinkOnly = useCallback(
    (value: boolean) => {
      setExtraConfig((prev) =>
        merge(prev, { panel: { linkOfAdjacentRootNodeOnly: value } }),
      );
    },
    [setExtraConfig],
  );

  return (
    <div className="flex items-center gap-4">
      <ToolbarContainer>
        <LabelButton
          ui_color="secondary"
          ui_variant={isAdjacentLinkOnly ? "default" : "ghost"}
          onClick={() => setAdjacentLinkOnly(!isAdjacentLinkOnly)}
        >
          {isAdjacentLinkOnly ? <CheckIcon /> : <CloseIcon />} Adjacent Link
          Only
        </LabelButton>
      </ToolbarContainer>
    </div>
  );
}

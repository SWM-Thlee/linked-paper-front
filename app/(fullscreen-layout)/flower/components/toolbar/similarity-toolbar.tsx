import { useCallback, useMemo, useState } from "react";

import LabelButton from "@/ui/label-button";
import BloomIcon from "@/ui/icons/bloom";
import Slider from "@/ui/slider";
import IconButton from "@/ui/icon-button";
import AddIcon from "@/ui/icons/add";
import RemoveIcon from "@/ui/icons/remove";
import ToolbarContainer from "../../../../../components/toolbar/toolbar-container";

const config = {
  step: 25,
  default: 75,
  min: 0,
  max: 100,
} as const;

function resolve(percentage: number) {
  if (percentage === config.min) return "All";
  if (percentage === config.max) return "Same";

  return `${percentage}%~`;
}

export default function SimilarityToolbar() {
  const [openDetails, setOpenDetails] = useState(false);
  const [value, setValue] = useState<number[]>([config.default]);

  const text = useMemo(() => resolve(value[0]), [value]);

  const widenSimilarity = useCallback(() => {
    setValue(([prevValue]) => [Math.min(prevValue + config.step, config.max)]);
  }, []);

  const narrowSimilarity = useCallback(() => {
    setValue(([prevValue]) => [Math.max(prevValue - config.step, config.min)]);
  }, []);

  return (
    <ToolbarContainer>
      <LabelButton
        ui_color="secondary"
        className="flex w-[6rem] items-center justify-between"
        onClick={() => setOpenDetails((open) => !open)}
      >
        <BloomIcon ui_size="small" />
        {text}
      </LabelButton>
      {openDetails && (
        <Slider
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onValueChange={setValue}
          className="w-[10rem]"
          ui_color="tertiary"
        />
      )}
      <IconButton
        ui_shape="circle"
        aria-label="Widen Similarity"
        onClick={widenSimilarity}
      >
        <AddIcon ui_size="small" />
      </IconButton>
      <IconButton
        ui_shape="circle"
        aria-label="Narrow Similarity"
        onClick={narrowSimilarity}
      >
        <RemoveIcon ui_size="small" />
      </IconButton>
    </ToolbarContainer>
  );
}

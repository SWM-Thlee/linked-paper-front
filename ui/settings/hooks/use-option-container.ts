import { useCallback, useContext } from "react";
import { OptionContainerContext } from "../context";

export default function useOptionContainer() {
  const optionContainerID = useContext(OptionContainerContext);

  // DOM 내의 Option Container Element를 불러옵니다.
  // React Portal 목적으로 사용됩니다.
  const element = useCallback(() => {
    let container;

    /* eslint-disable no-cond-assign */
    if (
      !optionContainerID ||
      !(container = document.getElementById(optionContainerID))
    )
      throw new Error(
        "Error from OptionContainer: Option container is not found.",
      );

    return container;
  }, [optionContainerID]);

  return { optionContainerID, element };
}

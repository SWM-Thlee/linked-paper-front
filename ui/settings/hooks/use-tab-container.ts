import { useCallback, useContext } from "react";
import { TabContainerContext } from "../context";

export default function useTabContainer() {
  const tabContainerID = useContext(TabContainerContext);

  // DOM 내의 Tab Container Element를 불러옵니다.
  // React Portal 목적으로 사용됩니다.
  const element = useCallback(() => {
    let container;

    /* eslint-disable no-cond-assign */
    if (
      !tabContainerID ||
      !(container = document.getElementById(tabContainerID))
    )
      throw new Error("Error from TabContainer: Tab container is not found.");

    return container;
  }, [tabContainerID]);

  return { tabContainerID, element };
}

import { useCallback, useContext } from "react";
import { GroupContainerContext } from "../context";

export default function useGroupContainer() {
  const groupContainerID = useContext(GroupContainerContext);

  // DOM 내의 Group Container Element를 불러옵니다.
  // React Portal 목적으로 사용됩니다.
  const element = useCallback(() => {
    let container;

    /* eslint-disable no-cond-assign */
    if (
      !groupContainerID ||
      !(container = document.getElementById(groupContainerID))
    )
      throw new Error(
        "Error from GroupContainer: Group container is not found.",
      );

    return container;
  }, [groupContainerID]);

  return { groupContainerID, element };
}

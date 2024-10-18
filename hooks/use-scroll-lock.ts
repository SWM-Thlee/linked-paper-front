import { useCallback } from "react";
import { useAtom } from "jotai";

import { scrollLockAtom } from "@/components/layout/body-with-scroll-lock";

export default function useScrollLock(tag: string) {
  const [, setLockDeps] = useAtom(scrollLockAtom);

  const set = useCallback(
    (enabled: boolean) => {
      if (enabled)
        setLockDeps((deps) => (deps.includes(tag) ? deps : [...deps, tag]));
      else setLockDeps((deps) => deps.filter((currTag) => currTag !== tag));
    },
    [setLockDeps, tag],
  );

  return set;
}

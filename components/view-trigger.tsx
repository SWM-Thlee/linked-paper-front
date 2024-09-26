"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  /** ViewTrigger가 Trigger되는 조건을 명시됩니다. */
  trigger: boolean;

  /** ViewTrigger가 다시 원래 상태로 돌아오는 조건을 명시합니다. */
  restore: boolean;

  /** Trigger가 작동될 시 호출할 Callback을 명시합니다. */
  onTrigger: () => void;
};

export default function ViewTrigger({ trigger, restore, onTrigger }: Props) {
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(inView && trigger && !loading)) return;
    setLoading(true);
    onTrigger();
  }, [loading, inView, trigger, onTrigger]);

  useEffect(() => {
    if (!(!inView && restore && loading)) return;
    setLoading(false);
  }, [inView, loading, restore]);

  return !loading ? <div ref={ref} /> : null;
}

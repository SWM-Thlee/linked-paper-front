import { useCallback, useRef } from "react";
import equal from "fast-deep-equal";

/** 각 Render Phase에서 이전 시점(Phase)의 정보와 비교하기 위해 사용됩니다. */
export default function usePrevious<T>() {
  const ref = useRef<T>();

  const value = ref.current;
  const isInited = ref.current !== undefined;

  const isEqualTo = useCallback(
    (targetValue: T, deepCheck: boolean = true) =>
      deepCheck ? equal(ref.current, targetValue) : ref.current === targetValue,
    [],
  );

  const setPrevious = useCallback((targetValue: T) => {
    ref.current = targetValue;
  }, []);

  const reset = useCallback(() => {
    ref.current = undefined;
  }, []);

  return { value, isEqualTo, isInited, setPrevious, reset };
}

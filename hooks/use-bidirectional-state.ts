import { useCallback, useEffect, useState } from "react";

/**
 * Component 내의 특정 값이 외부에도 영향을 받는 경우에 사용됩니다.
 *
 * 즉, **Inner Component**와 **Outer Component** 모두에게 영향을 받는 데이터를 정의하고자 할 때 사용됩니다.
 *
 * **주의:** undefined를 T의 값의 하나로 취급하는 경우 정상적으로 작동하지 않습니다.
 */
export default function useBidirectionalState<T>(
  initialValue: T,
  outerInput?: T,
  outerOutput?: (data: T) => void,
  debounce: number = 50,
) {
  const [info, setInfo] = useState<{
    modifiedAtInner: boolean;
    data: T;
  }>({
    modifiedAtInner: false,
    data: initialValue,
  });

  const setData = useCallback(
    (data: T) => setInfo({ modifiedAtInner: true, data }),
    [],
  );

  useEffect(() => {
    if (info.data === outerInput) return () => {};

    // 외부에서 수정된 경우
    if (!info.modifiedAtInner) {
      setInfo({ modifiedAtInner: false, data: outerInput ?? initialValue });
      return () => {};
    }

    // 내부에서 수정된 경우
    const timer = setTimeout(() => {
      if (outerInput === undefined) return;
      setInfo({ modifiedAtInner: false, data: info.data });
      outerOutput?.(info.data);
    }, debounce);

    return () => clearTimeout(timer);
  }, [info, outerInput, outerOutput, initialValue, debounce]);

  return [info.data, setData] as const;
}

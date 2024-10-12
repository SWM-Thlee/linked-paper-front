import { useCallback, useMemo, useState } from "react";

import { merge } from "@/utils/merge";
import { Flower } from "../../types";
import { defaultViewConfig } from "../../utils/default-config";

type Props = {
  initialViewConfig?: Flower.Config.View;
};

/**
 * Graph의 View 관련 설정을 관리합니다.
 *
 * **주의**: View Modes는 매 렌더링마다 참조되므로, 메모이제이션을 수행하거나
 * 별도의 전역 상수로 두어야 합니다.
 */
export default function useGraphViewConfig(props?: Props) {
  const [viewConfig, setViewConfig] = useState<Flower.Config.View>(
    props?.initialViewConfig ?? defaultViewConfig,
  );
  const [extraViewConfig, setExtraViewConfig] =
    useState<Flower.Config.ViewPatcher>({});

  const setDefaults = useCallback(() => setExtraViewConfig({}), []);

  const resolvedConfig = useMemo(
    () => merge<Flower.Config.View>(viewConfig, extraViewConfig),
    [viewConfig, extraViewConfig],
  );

  return {
    defaultViewConfig: viewConfig,
    viewConfig: resolvedConfig,
    setViewConfig,
    setExtraViewConfig,
    setDefaults,
  };
}

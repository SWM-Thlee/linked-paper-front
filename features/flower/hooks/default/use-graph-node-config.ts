import { useCallback, useMemo, useState } from "react";

import { merge } from "@/utils/merge";
import { Flower } from "../../types";
import { defaultNodeConfig } from "../../utils/default-config";

type Props<T extends string = string> = {
  modes?: Record<T, Flower.Config.NodePatcher>;
  initialNodeConfig?: Flower.Config.Node;
};

/**
 * Graph의 Node 관련 설정을 관리합니다.
 *
 * **주의**: Node Modes는 매 렌더링마다 참조되므로, 메모이제이션을 수행하거나
 * 별도의 전역 상수로 두어야 합니다.
 */
export default function useGraphNodeConfig<T extends string = string>(
  props?: Props<T>,
) {
  const [nodeConfig, setNodeConfig] = useState<Flower.Config.Node>(
    props?.initialNodeConfig ?? defaultNodeConfig,
  );
  const [nodeMode, setNodeMode] = useState<T | null>(null);

  const setModeToDefaults = useCallback(() => setNodeMode(null), []);

  const resolvedConfig = useMemo(
    () =>
      merge<Flower.Config.Node>(
        nodeConfig,
        nodeMode ? props?.modes?.[nodeMode] ?? {} : {},
      ),
    [props?.modes, nodeConfig, nodeMode],
  );

  return {
    defaultNodeConfig: nodeConfig,
    nodeConfig: resolvedConfig,
    setNodeConfig,
    nodeMode,
    setNodeMode,
    setModeToDefaults,
  };
}

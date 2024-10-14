"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";

import useCanvasVariants from "@/hooks/use-canvas-variants";
import useGraphHandler from "@/features/flower/hooks/default/use-graph-handler";
import useGraphNodeConfig from "@/features/flower/hooks/default/use-graph-node-config";
import useGraphViewConfig from "@/features/flower/hooks/default/use-graph-view-config";
import useGraphData from "@/features/flower/hooks/default/use-graph-data";
import useNodeHoverHandler from "@/features/flower/hooks/extra/use-node-hover-handler";
import useNodeSelectionHandler from "@/features/flower/hooks/extra/use-node-selection-handler";
import useNodeFocus from "@/features/flower/hooks/extra/use-node-focus";
import useNodePapers from "@/features/flower/hooks/extra/use-node-papers";
import useFlowerParam from "@/features/flower/hooks/query/use-flower-param";
import useFlowerQuery from "@/features/flower/hooks/query/use-flower-query";

import Graph from "@/features/flower/components/graph";
import { merge } from "@/utils/merge";
import { Flower } from "@/features/flower/types";
import {
  defaultAreaHandler,
  defaultRenderer,
} from "@/features/flower/utils/default-renderer";
import {
  drawCircle,
  drawLink,
  drawWrappedText,
  limitRange,
} from "@/features/flower/utils/draw";
import {
  createChildNode,
  createLink,
  createRootNode,
} from "@/features/flower/utils/graph";
import {
  isChildNode,
  isGroupNode,
  isRootNode,
} from "@/features/flower/utils/validator";

import LabelButton from "@/ui/label-button";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import { PaperMetadata } from "@/types/paper";

import { variants } from "../utils/variants";
import ZoomToolbar from "./toolbar/zoom-toolbar";
import ToolbarWrapper from "./toolbar/toolbar-wrapper";
import ToolbarContainer from "./toolbar/toolbar-container";
import SidebarWrapper from "./sidebar/sidebar-wrapper";
import PaperInfoSidebar from "./sidebar/paper-info-sidebar";
import SettingsToolbar from "./toolbar/settings-toolbar";

// TODO: Node 중앙 고정 기능 추가
// TODO: CenterPoint
export default function FlowerGraphView() {
  const { nodeConfig } = useGraphNodeConfig();
  const { viewConfig, setExtraViewConfig } = useGraphViewConfig();
  const { handler, refHandler } = useGraphHandler();
  const { data, get, upsert, remove, getNodes, getLinksFromTarget } =
    useGraphData();

  /* Extra Node Handler */
  const styles = useCanvasVariants(variants);
  const { nodeOnHover } = useNodeHoverHandler(handler);
  const { focus } = useNodeFocus(handler, viewConfig);
  const { select, unselect, isSelected, selectedOne, onSelect, onUnselect } =
    useNodeSelectionHandler();

  /* Flower Correlations */
  const initial = useFlowerParam();
  const { flowerPaperID, loadFlower, onFlowerLoaded } = useFlowerQuery(initial);
  const { getPaper, upsertPaper, hasPaper } = useNodePapers();

  /* Flower Handler */
  const [paperInfo, setPaperInfo] = useState<PaperMetadata | null>(null);

  /* Node Renderer */
  const renderRootNode: Flower.Render.RenderNode = useCallback(
    (node, ctx, scale) => {
      const paper = getPaper(node.paperID);
      const style = isSelected(node.id)
        ? styles.node.rootSelected
        : nodeOnHover?.id === node.id
          ? styles.node.rootHovered
          : styles.node.root;

      // Draw Node
      ctx.strokeStyle = style.borderColorStyle;
      ctx.fillStyle = style.bgColorStyle;

      drawCircle({
        ctx,
        x: node.x!,
        y: node.y!,
        radius: nodeConfig.radius.root.default,
        stroke: !(isSelected(node.id) || nodeOnHover?.id === node.id)
          ? 2
          : undefined,
      });

      // Draw Text
      ctx.fillStyle = style.textColorStyle;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = style.fontStyleWith({
        scale: limitRange(scale, 3, 4),
      });

      drawWrappedText({
        ctx,
        text: paper?.title ?? "Loading",
        maxWidth: 175,
        lineHeight: 24,
        x: node.x!,
        y: node.y!,
      });
    },
    [
      getPaper,
      isSelected,
      nodeOnHover?.id,
      styles.node.rootHovered,
      nodeConfig.radius.root.default,
      styles.node.root,
      styles.node.rootSelected,
    ],
  );

  const renderChildNode: Flower.Render.RenderNode = useCallback(
    (node, ctx, scale) => {
      const paper = getPaper(node.paperID);
      const style =
        nodeOnHover?.id === node.id
          ? styles.node.childHovered
          : styles.node.child;

      // Draw Node
      ctx.strokeStyle = style.borderColorStyle;
      ctx.fillStyle = style.bgColorStyle;

      drawCircle({
        ctx,
        x: node.x!,
        y: node.y!,
        radius: nodeConfig.radius.child.default,
      });

      // Draw Text
      ctx.fillStyle = style.textColorStyle;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = style.fontStyleWith({
        scale: limitRange(scale, 3, 4),
      });

      drawWrappedText({
        ctx,
        text: paper?.title ?? "Loading",
        maxWidth: 225,
        lineHeight: 24,
        x: node.x!,
        y: node.y!,
      });
    },
    [
      getPaper,
      nodeConfig.radius.child.default,
      styles.node.child,
      styles.node.childHovered,
      nodeOnHover?.id,
    ],
  );

  const renderLink: Flower.Render.RenderLink = useCallback(
    ({ source, target }, ctx) => {
      if (viewConfig.panel.linkOfAdjacentRootNodeOnly) {
        if (
          !(
            nodeOnHover?.id === source.id ||
            nodeOnHover?.id === target.id ||
            selectedOne === source.id ||
            selectedOne === target.id
          )
        )
          return;
      }

      const style = styles.link.default;
      const fromCenter = nodeConfig.link.distanceFromCenter;

      ctx.strokeStyle = style.bgColorStyle;
      ctx.lineWidth =
        nodeConfig.link.width[source.type]?.[target?.type] ??
        nodeConfig.link.width.default;

      const sourceRadius =
        fromCenter[source.baseType]?.[source.type] ??
        fromCenter[source.baseType].default;

      const targetRadius =
        fromCenter[target.baseType]?.[source.type] ??
        fromCenter[target.baseType].default;

      const x1 = source.x!;
      const y1 = source.y!;
      const x2 = target.x!;
      const y2 = target.y!;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const sourceX = x1 + Math.cos(angle) * sourceRadius;
      const sourceY = y1 + Math.sin(angle) * sourceRadius;
      const targetX = x2 - Math.cos(angle) * targetRadius;
      const targetY = y2 - Math.sin(angle) * targetRadius;

      drawLink({ ctx, sourceX, sourceY, targetX, targetY });
    },
    [
      nodeOnHover,
      selectedOne,
      viewConfig.panel.linkOfAdjacentRootNodeOnly,
      nodeConfig.link.distanceFromCenter,
      nodeConfig.link.width,
      styles.link.default,
    ],
  );

  const renderer = useMemo<Flower.Render.Renderer>(
    () =>
      merge(defaultRenderer, {
        area: {
          [Flower.Graph.DefaultNode.ROOT]: defaultAreaHandler(
            nodeConfig.radius.root.default,
          ),
          [Flower.Graph.DefaultNode.CHILD]: defaultAreaHandler(
            nodeConfig.radius.child.default,
          ),
        },
        node: {
          [Flower.Graph.DefaultNode.ROOT]: renderRootNode,
          [Flower.Graph.DefaultNode.CHILD]: renderChildNode,
        },
        link: {
          [Flower.Graph.DefaultNode.ROOT]: {
            [Flower.Graph.DefaultNode.ROOT]: renderLink,
            [Flower.Graph.DefaultNode.CHILD]: renderLink,
          },
        },
      }),
    [
      renderRootNode,
      renderChildNode,
      renderLink,
      nodeConfig.radius.root.default,
      nodeConfig.radius.child.default,
    ],
  );

  /* Initial Behavior: 중앙에 Root Node를 삽입합니다. */
  useEffect(() => {
    upsert(createRootNode(initial));
  }, [initial, upsert]);

  // TODO: 적절한 Error 처리
  /* On Correlations Loaded: Paper 정보를 추가 후, Child Node를 생성합니다. */
  useEffect(() => {
    onFlowerLoaded(({ paper, data: childData }) => {
      // 1. Root Node에 Paper 등록
      if (flowerPaperID !== paper.id) {
        throw new Error(
          "Error from Load Flower: Loaded flower data and target data mismatches.",
        );
      }

      const nodes = getNodes((node) => node.paperID === flowerPaperID);

      // TODO: 다시 이 페이지로 돌아올 시 에러 발생
      if (nodes.length !== 1 || !isRootNode(nodes[0])) {
        throw new Error(
          "Error from Load Flower: Target Node must be a root node.",
        );
      }

      const [rootNode] = nodes;
      upsertPaper(paper);

      // 2. Child Node 등록
      childData
        .filter((child) => !hasPaper(child.id))
        .forEach((childPaper) => {
          const childNode = createChildNode(childPaper.id, rootNode.id, true);
          const link = createLink(rootNode, childNode);

          upsertPaper(childPaper);
          upsert(childNode);
          upsert(link);
        });

      // 3. Root Node 선택
      setTimeout(() => select(rootNode.id, true), 100);
    });
  }, [
    flowerPaperID,
    getNodes,
    hasPaper,
    onFlowerLoaded,
    select,
    upsert,
    upsertPaper,
  ]);

  /* Event: Node 선택이 해제된 경우 Child Node를 숨깁니다. */
  useEffect(() => {
    onUnselect("RootNodeUnselected", (nodeID) => {
      const node = get(nodeID);
      if (!node || !isRootNode(node)) return;

      const childNodes = getNodes(
        (child) => isChildNode(child) && child.parentID === node.id,
      );

      upsert(
        ...produce(childNodes, (draft) => {
          draft.forEach((child) => (child.visible = false));
        }),
      );
    });
  }, [onUnselect, get, getNodes, upsert]);

  /* Event: 특정 Node가 선택된 경우 Child Node를 표시합니다. */
  useEffect(() => {
    onSelect("RootNodeSelected", (nodeID) => {
      const node = get(nodeID);
      if (!node || !isRootNode(node)) return;

      const childNodes = getNodes(
        (child) => isChildNode(child) && child.parentID === node.id,
      );

      upsert(
        ...produce(childNodes, (draft) => {
          draft.forEach((child) => (child.visible = true));
        }),
      );

      focus({ nodeID: node.id });
    });
  }, [onSelect, get, getNodes, upsert, focus]);

  /* Event: 특정 Root Node Click 시 Select합니다. */
  useEffect(() => {
    handler?.event.registerHandler(
      Flower.Event.Type.NODE_CLICK,
      (node) => {
        if (!isRootNode(node)) return;

        if (isSelected(node.id)) unselect();
        else select(node.id, true);
      },
      "RootNodeClicked",
    );
  }, [handler?.event, isSelected, select, unselect]);

  /* Event: 특정 Child Node Click 시 Bloom합니다. */
  useEffect(() => {
    handler?.event.registerHandler(
      Flower.Event.Type.NODE_CLICK,
      (node) => {
        if (!isChildNode(node)) return;

        // 1. 새로운 Root Node 생성 및 Link 연결
        const rootPaper = getPaper(node.paperID);
        const parentRootNode = get(node.parentID);

        if (!rootPaper || !parentRootNode || !isRootNode(parentRootNode))
          return;

        const rootNode = createRootNode(rootPaper.id);
        const rootLink = createLink(parentRootNode, rootNode);

        // TODO: 업데이트 시 x를 고정하는 역할이 될 수 있다.
        // rootNode.x = node.x! + (node.x! - parentRootNode.x!) * 10;
        // rootNode.y = node.y! + (node.y! - parentRootNode.y!) * 10;

        upsert(rootNode);
        upsert(rootLink);

        // 2. 기존 Child Node 및 Link 삭제
        remove(node.id);
        getLinksFromTarget(node.id)?.forEach((link) => remove(link.id));

        // 3. Flower
        loadFlower(node.paperID);
      },
      "ChildNodeClicked",
    );
  }, [
    unselect,
    isSelected,
    handler?.event,
    getLinksFromTarget,
    select,
    getPaper,
    get,
    upsert,
    remove,
    upsertPaper,
    loadFlower,
  ]);

  /* Event: Root or Child Node Right Click 시 Paper Info를 보여줍니다. */
  useEffect(() => {
    handler?.event.registerHandler(
      Flower.Event.Type.NODE_RCLICK,
      (node) => {
        if (isGroupNode(node)) return;
        const paper = getPaper(node.paperID);
        setPaperInfo(paper ?? null);
      },
      "NodeRightClicked",
    );
  }, [handler?.event, getPaper]);

  return (
    <Graph
      data={data}
      ref={refHandler}
      renderer={renderer}
      nodeConfig={nodeConfig}
      viewConfig={viewConfig}
    >
      <SidebarWrapper>
        {paperInfo && (
          <PaperInfoSidebar
            paper={paperInfo}
            onClose={() => setPaperInfo(null)}
          />
        )}
      </SidebarWrapper>
      <ToolbarWrapper>
        {/* Zoom 설정 */}
        <ZoomToolbar handler={handler} viewConfig={viewConfig} />

        {/* Node 탐색 */}
        <div className="absolute left-[50%] top-[50%] flex -translate-x-[50%] -translate-y-[50%] items-center gap-2">
          {selectedOne && (
            <ToolbarContainer>
              <LabelButton
                ui_variant="light"
                ui_color="tertiary"
                onClick={() => focus({ nodeID: selectedOne })}
              >
                <ArrowBackIcon ui_size="small" />
                Back to Current Flower
              </LabelButton>
            </ToolbarContainer>
          )}
        </div>

        <SettingsToolbar
          viewConfig={viewConfig}
          setExtraConfig={setExtraViewConfig}
        />
      </ToolbarWrapper>
    </Graph>
  );
}

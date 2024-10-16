"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";

import useCanvasVariants from "@/hooks/use-canvas-variants";
import useGraphHandler from "@/features/graph/hooks/default/use-graph-handler";
import useGraphNodeConfig from "@/features/graph/hooks/default/use-graph-node-config";
import useGraphViewConfig from "@/features/graph/hooks/default/use-graph-view-config";
import useGraphData from "@/features/graph/hooks/default/use-graph-data";
import useNodeHoverHandler from "@/features/graph/hooks/extra/use-node-hover-handler";
import useNodeSelectionHandler from "@/features/graph/hooks/extra/use-node-selection-handler";
import useNodeFocus from "@/features/graph/hooks/extra/use-node-focus";
import useFlowerParam from "@/features/flower/hooks/use-flower-param";
import useFlowerQueries from "@/features/flower/hooks/use-flower-queries";
import usePapers from "@/features/paper/hooks/use-papers";
import usePaperSimilarities from "@/features/paper/hooks/use-paper-similarities";

import { Paper } from "@/features/paper/types";
import { Graph } from "@/features/graph/types";
import { merge } from "@/utils/merge";
import {
  defaultAreaHandler,
  defaultRenderer,
} from "@/features/graph/utils/default-renderer";
import {
  drawCircle,
  drawLink,
  drawLinkText,
  drawWrappedText,
  limitRange,
} from "@/features/graph/utils/draw";
import {
  createChildNode,
  createLink,
  createRootNode,
} from "@/features/graph/utils/graph";
import {
  isChildNode,
  isGroupNode,
  isRootNode,
} from "@/features/graph/utils/validator";

import GraphView from "@/features/graph/components/graph-view";
import LabelButton from "@/ui/label-button";

import ArrowUpIcon from "@/ui/icons/arrow-up";
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
  const { rootLinkStyle, childLinkStyle, rootStyle, childStyle } =
    useCanvasVariants(variants);
  const { isHovered } = useNodeHoverHandler(handler);
  const { focus } = useNodeFocus(handler, viewConfig);
  const { select, unselect, isSelected, selectedOne, onSelect, onUnselect } =
    useNodeSelectionHandler();

  /* Flower Correlations */
  const initial = useFlowerParam();
  const {
    isFlowerLoading,
    isFlowerLoaded,
    loadFlower,
    onFlowerLoaded,
    onFlowerError,
  } = useFlowerQueries();
  const { get: getSimilarity, set: setSimilarity } = usePaperSimilarities();
  const { getPaper, upsertPaper, hasPaper } = usePapers();

  /* Flower Handler */
  const [paperInfo, setPaperInfo] = useState<Paper.Scheme.Metadata | null>(
    null,
  );

  /* Node Renderer */
  const renderRootNode: Graph.Render.RenderNode = useCallback(
    (node, ctx, scale) => {
      const { selected, hovered, defaultNode } = rootStyle;
      const paper = getPaper(node.paperID);
      const style = isSelected(node.id)
        ? selected
        : isHovered(node.id)
          ? hovered
          : defaultNode;

      /* Render Node */
      ctx.strokeStyle = style.borderColorStyle;
      ctx.fillStyle = style.bgColorStyle;

      drawCircle({
        ctx,
        x: node.x!,
        y: node.y!,
        radius: nodeConfig.radius.root.default,
        stroke: !(isSelected(node.id) || isHovered(node.id)) ? 2 : undefined,
      });

      /* Render Text */
      ctx.fillStyle = style.textColorStyle;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = style.fontStyleWith({
        scale: limitRange(scale, 3, 4),
      });

      /* Title */
      drawWrappedText({
        ctx,
        text: paper?.title ?? "Loading Node",
        maxWidth: 175,
        lineHeight: 24,
        maxLines: 3,
        x: node.x!,
        y: node.y! - 24,
      });

      /* Date */
      drawWrappedText({
        ctx,
        text: paper?.date ?? "Unknown Date",
        maxWidth: 175,
        lineHeight: 24,
        x: node.x!,
        y: node.y! + 36,
      });

      /* Author */
      drawWrappedText({
        ctx,
        text: `${paper?.authors?.[0] ?? "Unknown"}`,
        maxWidth: 175,
        lineHeight: 24,
        x: node.x!,
        y: node.y! + 72,
      });
    },
    [
      getPaper,
      isSelected,
      isHovered,
      rootStyle,
      nodeConfig.radius.root.default,
    ],
  );

  const renderChildNode: Graph.Render.RenderNode = useCallback(
    (node, ctx, scale) => {
      const { blooming, hovered, defaultNode } = childStyle;
      const paper = getPaper(node.paperID);
      const style = isFlowerLoading(node.paperID)
        ? blooming
        : isHovered(node.id)
          ? hovered
          : defaultNode;

      /* Render Node */
      ctx.strokeStyle = style.borderColorStyle;
      ctx.fillStyle = style.bgColorStyle;

      drawCircle({
        ctx,
        x: node.x!,
        y: node.y!,
        radius: nodeConfig.radius.child.default,
        stroke: isFlowerLoading(node.paperID) ? 16 : undefined,
      });

      /* Render Text */
      ctx.fillStyle = style.textColorStyle;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = style.fontStyleWith({
        scale: limitRange(scale, 3, 4),
      });

      /* Title */
      drawWrappedText({
        ctx,
        text: paper?.title ?? "Loading Node",
        maxWidth: 175,
        lineHeight: 24,
        maxLines: 3,
        x: node.x!,
        y: node.y! - 24,
      });

      /* Date */
      drawWrappedText({
        ctx,
        text: paper?.date ?? "Unknown Date",
        maxWidth: 175,
        lineHeight: 24,
        x: node.x!,
        y: node.y! + 36,
      });

      /* Author */
      drawWrappedText({
        ctx,
        text: `${paper?.authors?.[0] ?? "Unknown"}`,
        maxWidth: 175,
        lineHeight: 16,
        x: node.x!,
        y: node.y! + 72,
      });
    },
    [
      getPaper,
      childStyle,
      isFlowerLoading,
      isHovered,
      nodeConfig.radius.child.default,
    ],
  );

  const renderRootLink: Graph.Render.RenderLink = useCallback(
    ({ source, target }, ctx, scale) => {
      // Resolve Adjacent Node
      if (viewConfig.panel.linkOfAdjacentRootNodeOnly) {
        if (
          !(
            isHovered(source.id) ||
            isHovered(target.id) ||
            selectedOne === source.id ||
            selectedOne === target.id
          )
        )
          return;
      }

      const style = rootLinkStyle.defaultLink;
      const fromCenter = nodeConfig.link.distanceFromCenter;

      const similarity =
        (getSimilarity(source.paperID, target.paperID) ?? 0) * 100;

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
      drawLinkText({
        ctx,
        style,
        height: 24,
        text: `${similarity.toFixed(2)}%`,
        scale: limitRange(scale, 1, 2),
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
    },
    [
      isHovered,
      selectedOne,
      getSimilarity,
      rootLinkStyle.defaultLink,
      viewConfig.panel.linkOfAdjacentRootNodeOnly,
      nodeConfig.link.distanceFromCenter,
      nodeConfig.link.width,
    ],
  );

  const renderChildLink: Graph.Render.RenderLink = useCallback(
    ({ source, target }, ctx, scale) => {
      const { hovered, highSimilarity, mediumSimilarity, lowSimilarity } =
        childLinkStyle;

      const similarity =
        (getSimilarity(source.paperID, target.paperID) ?? 0) * 100;

      const style = isHovered(target.id)
        ? hovered
        : similarity > 66.0
          ? highSimilarity
          : similarity > 33.0
            ? mediumSimilarity
            : lowSimilarity;

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
      drawLinkText({
        ctx,
        style,
        height: 24,
        text: `${similarity.toFixed(2)}%`,
        scale: limitRange(scale, 1, 2),
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
    },
    [
      isHovered,
      getSimilarity,
      childLinkStyle,
      nodeConfig.link.distanceFromCenter,
      nodeConfig.link.width,
    ],
  );

  const renderer = useMemo<Graph.Render.Renderer>(
    () =>
      merge(defaultRenderer, {
        area: {
          [Graph.Element.DefaultNode.ROOT]: defaultAreaHandler(
            nodeConfig.radius.root.default,
          ),
          [Graph.Element.DefaultNode.CHILD]: defaultAreaHandler(
            nodeConfig.radius.child.default,
          ),
        },
        node: {
          [Graph.Element.DefaultNode.ROOT]: renderRootNode,
          [Graph.Element.DefaultNode.CHILD]: renderChildNode,
        },
        link: {
          [Graph.Element.DefaultNode.ROOT]: {
            [Graph.Element.DefaultNode.ROOT]: renderRootLink,
            [Graph.Element.DefaultNode.CHILD]: renderChildLink,
          },
        },
      }),
    [
      renderRootNode,
      renderRootLink,
      renderChildLink,
      renderChildNode,
      nodeConfig.radius.root.default,
      nodeConfig.radius.child.default,
    ],
  );

  /* Initial Loading: 중앙에 Root Node를 삽입합니다. */
  useEffect(() => {
    if (isFlowerLoading(initial) || isFlowerLoaded(initial)) return;

    loadFlower(initial);
    upsert(createRootNode(initial));
  }, [initial, loadFlower, upsert, isFlowerLoading, isFlowerLoaded]);

  /* On Correlations Error: Error 정보를 전파합니다. */
  useEffect(() => {
    onFlowerError(({ extra }) => {
      const paperID = extra?.paperID ?? "unknown";

      if (initial !== paperID) return;

      throw new Error(`Cannot load initial node of paper: ${paperID}`, {
        cause: paperID,
      });
    });
  }, [initial, onFlowerError]);

  /* On Correlations Loaded: Paper 정보를 추가 후, Child Node를 생성합니다. */
  useEffect(() => {
    onFlowerLoaded(({ paper, data: childData }) => {
      // 1. Node 가져오기
      const nodes = getNodes((node) => node.paperID === paper.id);

      if (nodes.length !== 1) {
        throw new Error(
          "Error from Loading Flower: There are more than a node or not found.",
        );
      }

      const [currentNode] = nodes;

      if (isRootNode(currentNode)) {
        upsertPaper(paper);

        childData
          .filter((child) => !hasPaper(child.id))
          .forEach((childPaper) => {
            const childNode = createChildNode(
              childPaper.id,
              currentNode.id,
              true,
            );
            const link = createLink(currentNode, childNode);

            setSimilarity(paper.id, childPaper.id, childPaper.similarity);
            upsertPaper(childPaper);
            upsert(childNode);
            upsert(link);
          });

        setTimeout(() => select(currentNode.id, true), 100);
      } else if (isChildNode(currentNode)) {
        const parentNode = get(currentNode.parentID);

        if (!parentNode || !isRootNode(parentNode))
          throw new Error("Error from Loading Flower: Parent node is invalid.");

        const rootNode = createRootNode(paper.id);
        const rootLink = createLink(parentNode, rootNode);

        upsert(rootNode);
        upsert(rootLink);

        remove(currentNode.id);
        getLinksFromTarget(currentNode.id)?.forEach((link) => remove(link.id));
        upsertPaper(paper);

        childData
          .filter((child) => !hasPaper(child.id))
          .forEach((childPaper) => {
            const childNode = createChildNode(childPaper.id, rootNode.id, true);
            const link = createLink(rootNode, childNode);

            setSimilarity(paper.id, childPaper.id, childPaper.similarity);
            upsertPaper(childPaper);
            upsert(childNode);
            upsert(link);
          });

        setTimeout(() => select(rootNode.id, true), 100);
      } else {
        throw new Error(
          "Error from Loading Flower: Target Node is not supported for flowering.",
        );
      }
    });
  }, [
    get,
    getLinksFromTarget,
    setSimilarity,
    getNodes,
    hasPaper,
    onFlowerLoaded,
    select,
    upsert,
    remove,
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
      Graph.Event.Type.NODE_CLICK,
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
      Graph.Event.Type.NODE_CLICK,
      (node) => {
        if (!isChildNode(node) || isFlowerLoading(node.paperID)) return;

        loadFlower(node.paperID);
      },
      "ChildNodeClicked",
    );
  }, [
    unselect,
    isSelected,
    isFlowerLoading,
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
      Graph.Event.Type.NODE_RCLICK,
      (node) => {
        if (isGroupNode(node)) return;
        const paper = getPaper(node.paperID);
        setPaperInfo(paper ?? null);
      },
      "NodeRightClicked",
    );
  }, [handler?.event, getPaper]);

  return (
    <GraphView
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
              <LabelButton onClick={() => focus({ nodeID: selectedOne })}>
                <ArrowUpIcon ui_size="small" />
                Current Flower
              </LabelButton>
            </ToolbarContainer>
          )}
        </div>

        <SettingsToolbar
          viewConfig={viewConfig}
          setExtraConfig={setExtraViewConfig}
        />
      </ToolbarWrapper>
    </GraphView>
  );
}

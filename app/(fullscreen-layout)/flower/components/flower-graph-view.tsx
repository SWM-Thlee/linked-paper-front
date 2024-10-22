"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import useCanvasVariants from "@/hooks/use-canvas-variants";
import useGraphHandler from "@/features/graph/hooks/default/use-graph-handler";
import useGraphNodeConfig from "@/features/graph/hooks/default/use-graph-node-config";
import useGraphViewConfig from "@/features/graph/hooks/default/use-graph-view-config";
import useGraphData from "@/features/graph/hooks/default/use-graph-data";
import useNodeHoverHandler from "@/features/graph/hooks/extra/use-node-hover-handler";
import useLinkHoverHandler from "@/features/graph/hooks/extra/use-link-hover-handler";
import useNodeSelectionHandler from "@/features/graph/hooks/extra/use-node-selection-handler";
import useNodeFocus from "@/features/graph/hooks/extra/use-node-focus";
import useFlowerParam from "@/features/flower/hooks/use-flower-param";
import useFlowerQueries from "@/features/flower/hooks/use-flower-queries";
import usePapers from "@/features/paper/hooks/use-papers";
import usePaperSimilarities from "@/features/paper/hooks/use-paper-similarities";
import useFullscreen from "@/hooks/use-fullscreen";
import useAnalytics from "@/features/analytics/hooks/use-analytics";

import { Paper } from "@/features/paper/types";
import { Graph } from "@/features/graph/types";
import { Analytics } from "@/features/analytics/types";
import { merge } from "@/utils/merge";
import { defaultRenderer } from "@/features/graph/utils/default-renderer";
import {
  createChildNode,
  createLink,
  createRootNode,
} from "@/features/graph/utils/graph";
import { isChildNode, isRootNode } from "@/features/graph/utils/validator";

import GraphView from "@/features/graph/components/graph-view";
import Sidebar from "@/features/graph/components/sidebar";
import LabelButton from "@/ui/label-button";

import CheckIcon from "@/ui/icons/check";
import CloseIcon from "@/ui/icons/close";
import {
  rootNode as rootNodeStyle,
  rootLink as rootLinkStyle,
  childLink as childLinkStyle,
  childNode as childNodeStyle,
} from "../utils/variants";
import ZoomToolbar from "./toolbar/zoom-toolbar";
import ToolbarWrapper from "./toolbar/toolbar-wrapper";
import ToolbarContainer from "./toolbar/toolbar-container";
import PaperInfoSidebar from "./sidebar/paper-info-sidebar";

export default function FlowerGraphView() {
  /* Analytics */
  const { log } = useAnalytics();

  /* Graph Handler */
  const { nodeConfig } = useGraphNodeConfig();
  const { viewConfig, setExtraViewConfig } = useGraphViewConfig();
  const { handler, refHandler } = useGraphHandler();
  const {
    data,
    get,
    upsertNode,
    upsertLink,
    removeNode,
    removeLink,
    getNodes,
    getLinksFromTarget,
    getConnectedNodes,
    getNodeDynamicData,
  } = useGraphData();
  const { width } = useFullscreen();

  /* Extra Node Handler */
  const rootNodeCv = useCanvasVariants(rootNodeStyle);
  const childNodeCv = useCanvasVariants(childNodeStyle);
  const rootLinkCv = useCanvasVariants(rootLinkStyle);
  const childLinkCv = useCanvasVariants(childLinkStyle);

  const { isHovered: isNodeHovered } = useNodeHoverHandler(handler);
  const { isHovered: isLinkHovered } = useLinkHoverHandler(handler);
  const { focus, focusOffsetX, setFocusOffsetX } = useNodeFocus(
    handler,
    viewConfig,
  );
  const { select, unselect, isSelected, selectedOne, onSelect } =
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
    ({ node, drawCircle, drawText }) => {
      const paper = getPaper(node.paperID);
      const loading = isFlowerLoading(node.paperID);
      const variant = loading
        ? "default"
        : isSelected(node.id)
          ? "selected"
          : isNodeHovered(node.id)
            ? "hovered"
            : "default";

      /* Draw Node */
      drawCircle({
        style: rootNodeCv.node({ ui_variant: variant }),
        radius: nodeConfig.radius.root.default,
        scale: { min: 0.3, max: 1 },
      });

      /* Draw Title */
      drawText({
        style: rootNodeCv.title({ ui_variant: variant }),
        text: paper?.title ?? "Loading Node",
        maxWidth: 260,
        height: 24,
        maxLines: 3,
        offsetY: isFlowerLoading(node.paperID) ? 0 : -24,
        scale: { min: 0.3, max: 1 },
      });

      /* Draw if loaded */
      if (!isFlowerLoading(node.paperID)) {
        /* Draw Date */
        drawText({
          style: rootNodeCv.info({ ui_variant: variant }),
          text: paper?.date ?? "Unknown Date",
          maxWidth: 260,
          height: 24,
          offsetY: 36,
          scale: { min: 0.3, max: 1 },
        });

        /* Draw Author */
        drawText({
          style: rootNodeCv.info({ ui_variant: variant }),
          text: `${paper?.authors?.[0] ?? "Unknown"}`,
          maxWidth: 260,
          height: 24,
          offsetY: 72,
          scale: { min: 0.3, max: 1 },
        });
      }
    },
    [
      getPaper,
      rootNodeCv,
      isSelected,
      isNodeHovered,
      isFlowerLoading,
      nodeConfig.radius.root.default,
    ],
  );

  const renderChildNode: Graph.Render.RenderNode = useCallback(
    ({ node, drawCircle, drawText }) => {
      const paper = getPaper(node.paperID);
      const links = getLinksFromTarget(node.id);

      if (!node || !isChildNode(node)) {
        throw new Error(
          "Error from Rendering Child Node: This node is not a child node.",
        );
      }

      const root = get(node.parentID);

      if (!root || !isRootNode(root)) {
        throw new Error(
          "Error from Rendering Child Node: Root node is not valid.",
        );
      }

      const similarity = (getSimilarity(node.paperID, root.paperID) ?? 0) * 100;

      /* Child Node Style */
      const variant = isFlowerLoading(node.paperID)
        ? "blooming"
        : isNodeHovered(node.id) ||
            [...(links?.values() ?? [])].some((link) => isLinkHovered(link.id))
          ? "hovered"
          : similarity >= 75.0
            ? "highSimilarity"
            : similarity >= 50.0
              ? "mediumSimilarity"
              : "lowSimilarity";

      /* Draw Node */
      drawCircle({
        style: childNodeCv.node({ ui_variant: variant }),
        radius: nodeConfig.radius.child.default,
      });

      /* Draw Title */
      drawText({
        style: childNodeCv.title({ ui_variant: variant }),
        text: paper?.title ?? "Loading Node",
        maxWidth: 260,
        height: 24,
        maxLines: 3,
        offsetY: -24,
      });

      /* Draw Date */
      drawText({
        style: childNodeCv.info({ ui_variant: variant }),
        text: paper?.date ?? "Unknown Date",
        maxWidth: 260,
        height: 24,
        offsetY: 36,
      });

      /* Draw Author */
      drawText({
        style: childNodeCv.info({ ui_variant: variant }),
        text: `${paper?.authors?.[0] ?? "Unknown"}`,
        maxWidth: 260,
        height: 24,
        offsetY: 72,
      });
    },
    [
      get,
      childNodeCv,
      getSimilarity,
      getPaper,
      getLinksFromTarget,
      isLinkHovered,
      isFlowerLoading,
      isNodeHovered,
      nodeConfig.radius.child.default,
    ],
  );

  const renderRootLink: Graph.Render.RenderLink = useCallback(
    ({ link: { id, source, target }, drawLink, drawLinkText }) => {
      const variant = isLinkHovered(id) ? "hovered" : "default";
      const radius = nodeConfig.link.distanceFromCenter;

      drawLink({
        style: rootLinkCv.link({ ui_variant: variant }),
        radius,
        scale: { max: 0.5 },
      });

      if (viewConfig.graph.viewSimilarity) {
        const similarity =
          (getSimilarity(source.paperID, target.paperID) ?? 0) * 100;

        drawLinkText({
          style: rootLinkCv.container({ ui_variant: variant }),
          height: 24,
          text: `${similarity.toFixed(2)}%`,
          scale: { max: 0.5 },
          radius,
        });
      }
    },
    [
      getSimilarity,
      isLinkHovered,
      rootLinkCv,
      nodeConfig.link.distanceFromCenter,
      viewConfig.graph.viewSimilarity,
    ],
  );

  const renderChildLink: Graph.Render.RenderLink = useCallback(
    ({ link: { id, source, target }, drawLink, drawLinkText }) => {
      const radius = nodeConfig.link.distanceFromCenter;

      /* Child Link Style */
      if (viewConfig.graph.viewSimilarity) {
        const similarity =
          (getSimilarity(source.paperID, target.paperID) ?? 0) * 100;

        const variant = isFlowerLoading(target.paperID)
          ? "blooming"
          : isNodeHovered(target.id) || isLinkHovered(id)
            ? "hovered"
            : similarity >= 75.0
              ? "highSimilarity"
              : similarity >= 50.0
                ? "mediumSimilarity"
                : "lowSimilarity";

        drawLink({ style: childLinkCv.link({ ui_variant: variant }), radius });
        drawLinkText({
          style: childLinkCv.container({ ui_variant: variant }),
          height: 24,
          text: `${similarity.toFixed(2)}%`,
          scale: { min: 1, max: 2 },
          radius,
        });
      } else {
        const variant = isFlowerLoading(target.paperID)
          ? "blooming"
          : isNodeHovered(target.id) || isLinkHovered(id)
            ? "hovered"
            : "default";

        drawLink({ style: childLinkCv.link({ ui_variant: variant }), radius });
      }
    },
    [
      isNodeHovered,
      isLinkHovered,
      isFlowerLoading,
      getSimilarity,
      childLinkCv,
      nodeConfig.link.distanceFromCenter,
      viewConfig.graph.viewSimilarity,
    ],
  );

  const renderer = useMemo<Graph.Render.Renderer>(
    () =>
      merge(defaultRenderer, {
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
    [renderRootNode, renderRootLink, renderChildLink, renderChildNode],
  );

  /* 노드 간을 연결하는 간선에 대해 설정합니다. */
  useEffect(() => {
    handler?.config.linkConfig((config) =>
      config
        .distance(({ source, target }) => {
          /* 일반적으로 기본 설정을 적용합니다. */
          return (
            nodeConfig.link.distance[source.type]?.[target.type] ??
            nodeConfig.link.distance.default
          );
        })
        .strength(({ source, target }) => {
          /* 단, Root-Root Link에는 Force를 부여하지 않습니다. */
          return isRootNode(source) && isRootNode(target) ? 0 : 1;
        }),
    );
  }, [handler?.config, nodeConfig.link.distance]);

  /* 어떤 노드를 보여줄 지 결정합니다. */
  useEffect(() => {
    handler?.event.onNodeFilter((node) => {
      if (isChildNode(node)) {
        /* Child Node는 선택된 Root Node의 Child여야 합니다. */
        if (node.parentID !== selectedOne) return false;

        /* Zoom 배율이 일정 수치 이하이면 Child Node를 숨깁니다. */
        const zoom = handler.config.applyConfig((config) => config.zoom());

        return !zoom || zoom > 0.4;
      }

      return true;
    });
  }, [handler?.event, handler?.config, selectedOne, getConnectedNodes]);

  /* 어떤 간선을 보여줄 지 결정합니다. */
  useEffect(() => {
    handler?.event.onLinkFilter(({ source, target }) => {
      /* Root-Child Link는 선택된 경우에만 보이도록 합니다. */
      if (
        (isRootNode(source) && isChildNode(target)) ||
        (isRootNode(target) && isChildNode(source))
      ) {
        if (!(selectedOne === source.id || selectedOne === target.id))
          return false;

        /* Zoom 배율이 일정 수치 이하이면 Child Node를 숨깁니다. */
        const zoom = handler.config.applyConfig((config) => config.zoom());

        return !zoom || zoom > 0.4;
      }

      return true;
    });
  }, [handler?.event, handler?.config, selectedOne, isNodeHovered]);

  /* 초기 로딩 시: 중앙에 Root Node를 삽입합니다. */
  useEffect(() => {
    if (isFlowerLoading(initial) || isFlowerLoaded(initial)) return;

    loadFlower(initial);
    upsertNode({ ...createRootNode(initial), fx: 0, fy: 0 });
  }, [initial, loadFlower, upsertNode, isFlowerLoading, isFlowerLoaded]);

  /* Event: Flower를 불러오는 중 Error 발생 */
  useEffect(() => {
    onFlowerError(({ extra }) => {
      const paperID = extra?.paperID ?? "unknown";

      if (initial !== paperID) return;

      throw new Error(`Cannot load initial node of paper: ${paperID}`, {
        cause: paperID,
      });
    });
  }, [initial, onFlowerError]);

  /* Event: Flower가 Load되었을 때 */
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

      /* 처음 노드를 로드할 경우 */
      if (isRootNode(currentNode)) {
        upsertPaper(paper, (p) => setPaperInfo(p));

        childData
          .filter((child) => !hasPaper(child.id))
          .forEach((childPaper) => {
            const childNode = createChildNode(childPaper.id, currentNode.id);
            const link = createLink(currentNode, childNode);

            setSimilarity(paper.id, childPaper.id, childPaper.similarity);
            upsertPaper(childPaper);
            upsertNode(childNode);
            upsertLink(link);
          });

        select(currentNode.id, true);
      } else if (isChildNode(currentNode)) {
        /* Child Node를 로드할 경우 */
        const parentNode = get(currentNode.parentID);
        const a = getNodeDynamicData(currentNode.parentID)!;
        const b = getNodeDynamicData(currentNode.id)!;

        if (!parentNode || !isRootNode(parentNode))
          throw new Error("Error from Loading Flower: Parent node is invalid.");

        const rootNode = createRootNode(paper.id);
        const rootLink = createLink(parentNode, rootNode);

        /* 위치 계산 */
        const dx = b.x! - a.x!;
        const dy = b.y! - a.y!;

        // 벡터의 길이 계산
        const length = Math.sqrt(dx * dx + dy * dy);

        // 방향 벡터를 distance만큼 이동
        const locX = a.x! + (2400 * dx) / length;
        const locY = a.y! + (2400 * dy) / length;

        upsertNode(rootNode, (dynamic) => {
          dynamic.fx = locX;
          dynamic.fy = locY;

          // TODO: 수정 필요
          setTimeout(() => select(rootNode.id, true), 500);
        });
        upsertLink(rootLink);

        removeNode(currentNode.id);
        getLinksFromTarget(currentNode.id)?.forEach((link) =>
          removeLink(link.id),
        );
        upsertPaper(paper);

        childData
          .filter((child) => !hasPaper(child.id))
          .forEach((childPaper) => {
            const childNode = createChildNode(childPaper.id, rootNode.id);
            const link = createLink(rootNode, childNode);

            setSimilarity(paper.id, childPaper.id, childPaper.similarity);
            upsertPaper(childPaper);
            upsertLink(link);
            upsertNode({
              ...childNode,
              x: locX,
              y: locY,
            });
          });
      } else {
        throw new Error(
          "Error from Loading Flower: Target Node is not supported for flowering.",
        );
      }
    });
  }, [
    get,
    getLinksFromTarget,
    getNodeDynamicData,
    setSimilarity,
    getNodes,
    hasPaper,
    onFlowerLoaded,
    select,
    upsertNode,
    upsertLink,
    removeNode,
    removeLink,
    upsertPaper,
  ]);

  /* Event: 한 쪽이 Selected 상태인 Root-Root Link Click 시 Select되지 않은 쪽을 Select합니다. */
  useEffect(() => {
    handler?.event.onEvent(
      Graph.Event.Type.LINK_CLICK,
      ({ source, target }) => {
        if (!(isRootNode(source) && isRootNode(target))) return;

        if (selectedOne === source.id && selectedOne !== target.id) {
          select(target.id, true);
        }

        if (selectedOne !== source.id && selectedOne === target.id) {
          select(source.id, true);
        }
      },
      "SelectedRootRootLinkClicked",
    );
  }, [handler?.event, selectedOne, select]);

  /* Event: 특정 Root Node가 선택된 경우 */
  useEffect(() => {
    onSelect("RootNodeSelected", (nodeID) => {
      const node = get(nodeID);

      if (!node || !isRootNode(node)) {
        throw new Error(
          "Error from Select Root Node: This node is not a root node.",
        );
      }

      const paper = getPaper(node.paperID);
      if (paper) setPaperInfo(paper);
    });
  }, [onSelect, get, getNodes, focus, getPaper]);

  /* Event: 특정 Root Node Click 시 Select합니다. */
  useEffect(() => {
    handler?.event.onEvent(
      Graph.Event.Type.NODE_CLICK,
      (node) => {
        if (!isRootNode(node) || isFlowerLoading(node.paperID)) return;

        if (!selectedOne || selectedOne !== node.id) {
          select(node.id, true);
        } else {
          const paper = getPaper(node.paperID);
          if (paper) setPaperInfo(paper);
          focus({ nodeID: node.id, padding: 1400 });
        }
      },
      "RootNodeClicked",
    );
  }, [
    handler?.event,
    isSelected,
    select,
    unselect,
    focus,
    isFlowerLoading,
    getPaper,
    selectedOne,
  ]);

  /* Event: Child Node RClick 시 논문 정보를 띄웁니다. */
  useEffect(() => {
    handler?.event.onEvent(Graph.Event.Type.NODE_RCLICK, (node) => {
      if (!isChildNode(node)) return;

      const paper = getPaper(node.paperID);
      if (paper) setPaperInfo(paper);
    });
  }, [handler?.event, getPaper]);

  /* Sidebar: Sidebar가 존재하(지 않으)면 Focus Offset을 바꿉니다. */
  useEffect(() => {
    if (paperInfo) {
      setFocusOffsetX(width * 0.18);
    } else {
      setFocusOffsetX(0);
    }
  }, [paperInfo, width, setFocusOffsetX]);

  useEffect(() => {
    if (selectedOne) {
      focus({ nodeID: selectedOne, padding: 1400 });
    }
  }, [focusOffsetX, focus, selectedOne]);

  /* Event: 특정 Child Node Click 시 Bloom합니다. */
  useEffect(() => {
    handler?.event.onEvent(
      Graph.Event.Type.NODE_CLICK,
      (node) => {
        if (!isChildNode(node) || isFlowerLoading(node.paperID)) return;
        loadFlower(node.paperID);
      },
      "ChildNodeClicked",
    );
  }, [isFlowerLoading, handler?.event, loadFlower]);

  /* User Event: 특정 Root Node의 Child Node를 클릭하여 Bloom을 수행합니다. */
  useEffect(() => {
    handler?.event.onEvent(
      Graph.Event.Type.NODE_CLICK,
      (node) => {
        if (!isChildNode(node) || isFlowerLoading(node.paperID)) return;

        /* Event 호출 */
        const childPaper = getPaper(node.paperID);
        const parentPaper = getPaper(get(node.parentID)?.paperID);

        if (!(childPaper && parentPaper)) return;

        const similarity = getSimilarity(childPaper.id, parentPaper.id);

        if (!similarity) return;

        log(Analytics.Event.CLICK_GRAPH_NODE, {
          paper: childPaper,
          parent_paper: parentPaper,
          similarity,
        });
      },
      "NodeClickTransition",
    );
  }, [isFlowerLoading, handler?.event, get, getPaper, getSimilarity, log]);

  return (
    <GraphView
      data={data}
      ref={refHandler}
      renderer={renderer}
      nodeConfig={nodeConfig}
      viewConfig={viewConfig}
    >
      <Sidebar>
        {paperInfo && (
          <PaperInfoSidebar
            paper={paperInfo}
            onClose={() => setPaperInfo(null)}
          />
        )}
      </Sidebar>
      <ToolbarWrapper>
        {/* Zoom 설정 */}
        <ZoomToolbar handler={handler} viewConfig={viewConfig} />

        {/* Node 유사도 표시 여부 */}
        <div className="absolute left-[50%] top-[50%] flex -translate-x-[50%] -translate-y-[50%] items-center gap-2" />
        <ToolbarContainer>
          <LabelButton
            ui_variant={viewConfig.graph.viewSimilarity ? "default" : "ghost"}
            onClick={() =>
              setExtraViewConfig({
                graph: { viewSimilarity: !viewConfig.graph.viewSimilarity },
              })
            }
          >
            {viewConfig.graph.viewSimilarity ? (
              <CloseIcon ui_size="small" />
            ) : (
              <CheckIcon ui_size="small" />
            )}
            View Similarity
          </LabelButton>
        </ToolbarContainer>
      </ToolbarWrapper>
    </GraphView>
  );
}

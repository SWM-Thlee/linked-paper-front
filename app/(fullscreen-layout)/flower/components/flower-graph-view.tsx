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

import { Paper } from "@/features/paper/types";
import { Graph } from "@/features/graph/types";
import { merge } from "@/utils/merge";
import { defaultRenderer } from "@/features/graph/utils/default-renderer";
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
  const { isHovered: isNodeHovered } = useNodeHoverHandler(handler);
  const { isHovered: isLinkHovered } = useLinkHoverHandler(handler);
  const { focus } = useNodeFocus(handler, viewConfig);
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
      const { selected, hovered, defaultNode } = rootStyle;
      const paper = getPaper(node.paperID);
      const loading = isFlowerLoading(node.paperID);
      const style = loading
        ? defaultNode
        : isSelected(node.id)
          ? selected
          : isNodeHovered(node.id)
            ? hovered
            : defaultNode;

      /* Draw Node */
      drawCircle({ style, radius: nodeConfig.radius.root.default });

      /* Draw Title */
      drawText({
        style,
        text: paper?.title ?? "Loading Node",
        maxWidth: 175,
        height: 24,
        maxLines: 3,
        offsetY: isFlowerLoading(node.paperID) ? 0 : -24,
        scale: { min: 3, max: 4 },
      });

      /* Draw if loaded */
      if (!isFlowerLoading(node.paperID)) {
        /* Draw Date */
        drawText({
          style,
          text: paper?.date ?? "Unknown Date",
          maxWidth: 175,
          height: 24,
          offsetY: 36,
          scale: { min: 3, max: 4 },
        });

        /* Draw Author */
        drawText({
          style,
          text: `${paper?.authors?.[0] ?? "Unknown"}`,
          maxWidth: 175,
          height: 24,
          offsetY: 72,
          scale: { min: 3, max: 4 },
        });
      }
    },
    [
      getPaper,
      isSelected,
      isNodeHovered,
      isFlowerLoading,
      rootStyle,
      nodeConfig.radius.root.default,
    ],
  );

  const renderChildNode: Graph.Render.RenderNode = useCallback(
    ({ node, drawCircle, drawText }) => {
      const { blooming, hovered, defaultNode } = childStyle;
      const paper = getPaper(node.paperID);
      const links = getLinksFromTarget(node.id);

      /* Child Node Style */
      const style = isFlowerLoading(node.paperID)
        ? blooming
        : isNodeHovered(node.id) ||
            links?.values().some((link) => isLinkHovered(link.id))
          ? hovered
          : defaultNode;

      /* Draw Node */
      drawCircle({
        style,
        radius: nodeConfig.radius.child.default,
      });

      /* Draw Title */
      drawText({
        style,
        text: paper?.title ?? "Loading Node",
        maxWidth: 175,
        height: 24,
        maxLines: 3,
        offsetY: -24,
        scale: { min: 3, max: 4 },
      });

      /* Draw Date */
      drawText({
        style,
        text: paper?.date ?? "Unknown Date",
        maxWidth: 175,
        height: 24,
        offsetY: 36,
        scale: { min: 3, max: 4 },
      });

      /* Draw Author */
      drawText({
        style,
        text: `${paper?.authors?.[0] ?? "Unknown"}`,
        maxWidth: 175,
        height: 24,
        offsetY: 72,
        scale: { min: 3, max: 4 },
      });
    },
    [
      getPaper,
      getLinksFromTarget,
      isLinkHovered,
      childStyle,
      isFlowerLoading,
      isNodeHovered,
      nodeConfig.radius.child.default,
    ],
  );

  const renderRootLink: Graph.Render.RenderLink = useCallback(
    ({ link: { id, source, target }, drawLink, drawLinkText }) => {
      const { defaultLink, hovered } = rootLinkStyle;
      const style = isLinkHovered(id) ? hovered : defaultLink;
      const radius = nodeConfig.link.distanceFromCenter;

      const similarity =
        (getSimilarity(source.paperID, target.paperID) ?? 0) * 100;

      const locate: Graph.Render.LinkTextLocateOption | undefined =
        selectedOne === source.id
          ? { from: "source", distance: 100 }
          : selectedOne === target.id
            ? { from: "target", distance: 100 }
            : undefined;

      drawLink({ style, radius });
      drawLinkText({
        style,
        height: 24,
        text: `${similarity.toFixed(2)}%`,
        scale: { min: 0.5, max: 2 },
        locate,
        radius,
      });
    },
    [
      selectedOne,
      getSimilarity,
      rootLinkStyle,
      isLinkHovered,
      nodeConfig.link.distanceFromCenter,
    ],
  );

  const renderChildLink: Graph.Render.RenderLink = useCallback(
    ({ link: { id, source, target }, drawLink, drawLinkText }) => {
      const {
        hovered,
        blooming,
        highSimilarity,
        mediumSimilarity,
        lowSimilarity,
      } = childLinkStyle;

      const similarity =
        (getSimilarity(source.paperID, target.paperID) ?? 0) * 100;

      /* Child Link Style */
      const style = isFlowerLoading(target.paperID)
        ? blooming
        : isNodeHovered(target.id) || isLinkHovered(id)
          ? hovered
          : similarity >= 75.0
            ? highSimilarity
            : similarity >= 50.0
              ? mediumSimilarity
              : lowSimilarity;

      const radius = nodeConfig.link.distanceFromCenter;

      drawLink({ style, radius });
      drawLinkText({
        style,
        height: 24,
        text: `${similarity.toFixed(2)}%`,
        scale: { min: 1, max: 2 },
        locate: { from: "source", distance: 100 },
        radius,
      });
    },
    [
      isNodeHovered,
      isLinkHovered,
      isFlowerLoading,
      getSimilarity,
      childLinkStyle,
      nodeConfig.link.distanceFromCenter,
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

  useEffect(() => {
    handler?.event.onNodeFilter((node) => {
      if (isChildNode(node)) {
        return selectedOne === node.parentID;
      }

      return true;
    });
  }, [handler?.event, selectedOne]);

  useEffect(() => {
    handler?.event.onLinkFilter(({ source, target }) => {
      // 1. Child Link는 선택된 경우에만 보이도록 합니다.
      if (
        (isRootNode(source) && isChildNode(target)) ||
        (isRootNode(target) && isChildNode(source))
      ) {
        return selectedOne === source.id || selectedOne === target.id;
      }

      // 2. 인접 노드만 링크가 보이도록 할 경우,
      // 루트 노드 간 링크에 대해 한 쪽 노드가 선택되거나 호버된 상태여야 합니다.
      if (viewConfig.panel.linkOfAdjacentRootNodeOnly) {
        if (isRootNode(source) && isRootNode(target)) {
          return (
            source.id === selectedOne ||
            target.id === selectedOne ||
            isNodeHovered(source.id) ||
            isNodeHovered(target.id)
          );
        }
      }

      return true;
    });
  }, [
    handler?.event,
    selectedOne,
    isNodeHovered,
    viewConfig.panel.linkOfAdjacentRootNodeOnly,
  ]);

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
            const childNode = createChildNode(childPaper.id, currentNode.id);
            const link = createLink(currentNode, childNode);

            setSimilarity(paper.id, childPaper.id, childPaper.similarity);
            upsertPaper(childPaper);
            upsert(childNode);
            upsert(link);
          });

        setTimeout(() => select(currentNode.id, true), 500);
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
            const childNode = createChildNode(childPaper.id, rootNode.id);
            const link = createLink(rootNode, childNode);

            setSimilarity(paper.id, childPaper.id, childPaper.similarity);
            upsertPaper(childPaper);
            upsert(childNode);
            upsert(link);
          });

        setTimeout(() => select(rootNode.id, true), 500);
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

  /* Event: 특정 Node가 선택된 경우 Child Node를 표시합니다. */
  useEffect(() => {
    onSelect("RootNodeSelected", (nodeID) => {
      focus({ nodeID, delay: 100 });
    });
  }, [onSelect, get, getNodes, upsert, focus]);

  /* Event: 특정 Root Node Click 시 Select합니다. */
  useEffect(() => {
    handler?.event.onEvent(
      Graph.Event.Type.NODE_CLICK,
      (node) => {
        if (!isRootNode(node) || isFlowerLoading(node.paperID)) return;

        if (isSelected(node.id)) unselect();
        else select(node.id, true);
      },
      "RootNodeClicked",
    );
  }, [handler?.event, isSelected, select, unselect, isFlowerLoading]);

  /* Event: 특정 Child Node 또는 Root-Child Click 시 Bloom합니다. */
  useEffect(() => {
    handler?.event.onEvent(
      Graph.Event.Type.NODE_CLICK,
      (node) => {
        if (!isChildNode(node) || isFlowerLoading(node.paperID)) return;

        loadFlower(node.paperID);
      },
      "ChildNodeClicked",
    );
    handler?.event.onEvent(
      Graph.Event.Type.LINK_CLICK,
      ({ source, target }) => {
        if (
          !isRootNode(source) ||
          !isChildNode(target) ||
          isFlowerLoading(target.paperID)
        )
          return;

        loadFlower(target.paperID);
      },
      "RootChildLinkClicked",
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
    handler?.event.onEvent(
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
              <LabelButton
                onClick={() => focus({ nodeID: selectedOne, delay: 100 })}
              >
                <ArrowUpIcon ui_size="small" />
                Current Flower
              </LabelButton>
            </ToolbarContainer>
          )}
        </div>

        <div className="flex items-center gap-4">
          <SettingsToolbar
            viewConfig={viewConfig}
            setExtraConfig={setExtraViewConfig}
          />
        </div>
      </ToolbarWrapper>
    </GraphView>
  );
}

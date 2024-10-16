"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  WheelEventHandler,
} from "react";
import ForceGraph from "react-force-graph-2d";

import useFullscreen from "@/hooks/use-fullscreen";
import useInternalGraphConfig from "@/features/graph/hooks/internal/use-internal-graph-config";
import useInternalGraphEventHandler from "@/features/graph/hooks/internal/use-internal-graph-event-handler";

import { Graph } from "@/features/graph/types";
import { GraphHandler } from "../hooks/default/use-graph-handler";
import {
  internalDrawLink,
  internalDrawLinkText,
  internalDrawNodeCircle,
  internalDrawNodeText,
} from "../utils/draw";

type Props = {
  /** Graph View 이외의 보조 UI를 구현할 때 사용됩니다. */
  children?: React.ReactNode;

  /** 노드의 설정을 나타냅니다. */
  nodeConfig: Graph.Config.Node;

  /** 그래프 뷰 탐색 설정을 나타냅니다. */
  viewConfig: Graph.Config.View;

  /** 그래프 뷰 요소에 대한 렌더러를 나타냅니다. */
  renderer: Graph.Render.Renderer;

  /** 그래프 데이터를 나타냅니다. */
  data: Graph.Element.Data;
};

const GraphView = forwardRef<GraphHandler, Props>(
  ({ children, viewConfig, nodeConfig, renderer, data }, handlerRef) => {
    /** 그래프는 항상 스크린 전체를 차지합니다. */
    const { width, height } = useFullscreen();

    /** 그래프의 내부 설정을 관리합니다. */
    const {
      internalRef,
      applyConfig,
      chargeConfig,
      collideConfig,
      linkConfig,
    } = useInternalGraphConfig();

    /** 그래프의 이벤트 핸들러를 관리합니다. */
    const { onHandleEvent, registerHandler } = useInternalGraphEventHandler();

    // 외부에서 사용할 설정들을 정의합니다.
    useImperativeHandle(
      handlerRef,
      () => ({
        config: {
          applyConfig,
          chargeConfig,
          collideConfig,
          linkConfig,
        },
        event: {
          registerHandler,
        },
      }),
      [applyConfig, chargeConfig, collideConfig, linkConfig, registerHandler],
    );

    /** 물리 엔진 초기화를 수행합니다. */
    useEffect(() => {
      linkConfig((config) =>
        config.distance(({ source, target }) => {
          return (
            nodeConfig.link.distance[source.type]?.[target.type] ??
            nodeConfig.link.distance.default
          );
        }),
      );
    }, [linkConfig, nodeConfig.link.distance]);

    useEffect(() => {
      collideConfig((config) =>
        config.radius(
          (node) =>
            nodeConfig.collision[node.baseType]?.[node.type] ??
            nodeConfig.collision[node.baseType].default,
        ),
      );
    }, [collideConfig, nodeConfig.collision]);

    useEffect(() => {
      chargeConfig((config) =>
        config.strength(
          (node) =>
            nodeConfig.charge[node.baseType]?.[node.type] ??
            nodeConfig.charge[node.baseType].default,
        ),
      );
    }, [chargeConfig, nodeConfig.charge]);

    const onDetermineNode: Graph.Render.DetermineNodeResolver = useCallback(
      (node, color, ctx, rawScale) => {
        const renderNodeFn = renderer.node[node.type] ?? renderer.node.default;

        renderNodeFn({
          node,
          drawCircle(props) {
            internalDrawNodeCircle({
              node,
              ctx,
              rawScale,
              determine: { color },
              ...props,
            });
          },
          drawText(props) {
            internalDrawNodeText({
              node,
              ctx,
              rawScale,
              determine: { color },
              ...props,
            });
          },
        });
      },
      [renderer.node],
    );

    const onDrawNode: Graph.Render.RenderNodeResolver = useCallback(
      (node, ctx, rawScale) => {
        const renderNodeFn = renderer.node[node.type] ?? renderer.node.default;

        renderNodeFn({
          node,
          drawCircle(props) {
            internalDrawNodeCircle({ node, ctx, rawScale, ...props });
          },
          drawText(props) {
            internalDrawNodeText({ node, ctx, rawScale, ...props });
          },
        });
      },
      [renderer.node],
    );

    const onDrawLink: Graph.Render.RenderLinkResolver = useCallback(
      (link, ctx, rawScale) => {
        const renderLinkFn =
          renderer.link[link.source.type]?.[link.target.type] ??
          renderer.link.default;

        renderLinkFn({
          link,
          drawLink(props) {
            internalDrawLink({ ctx, link, rawScale, ...props });
          },
          drawLinkText(props) {
            internalDrawLinkText({
              ctx,
              link,
              rawScale,
              ...props,
            });
          },
        });
      },
      [renderer.link],
    );

    const onDetermineLink: Graph.Render.DetermineLinkResolver = useCallback(
      (link, color, ctx, rawScale) => {
        const renderLinkFn =
          renderer.link[link.source.type]?.[link.target.type] ??
          renderer.link.default;

        renderLinkFn({
          link,
          drawLink(props) {
            internalDrawLink({
              ctx,
              link,
              rawScale,
              determine: { color },
              ...props,
            });
          },
          drawLinkText(props) {
            internalDrawLinkText({
              ctx,
              link,
              rawScale,
              determine: { color },
              ...props,
            });
          },
        });
      },
      [renderer.link],
    );

    const onDrawBefore: Graph.Render.RenderBefore = useCallback(
      (ctx, scale) => renderer.renderBefore?.(ctx, scale),
      [renderer],
    );

    const onDrawAfter: Graph.Render.RenderAfter = useCallback(
      (ctx, scale) => renderer.renderAfter?.(ctx, scale),
      [renderer],
    );

    /* Zoom By [Ctrl] + Wheel */
    const onDefaultWheelZoom: WheelEventHandler<HTMLDivElement> = useCallback(
      ({ deltaY, ctrlKey }) => {
        if (!(viewConfig.interaction.zoom && ctrlKey)) return;

        const { delta } = viewConfig.zoom;
        const scale = deltaY > 0 ? 1 - delta : 1 + delta;
        applyConfig((config) => config.zoom(config.zoom() * scale));
      },
      [applyConfig, viewConfig.zoom, viewConfig.interaction.zoom],
    );

    /* Scroll By Wheel */
    const onDefaultWheelScroll: WheelEventHandler<HTMLDivElement> = useCallback(
      ({ deltaX, deltaY, ctrlKey }) => {
        if (!viewConfig.interaction.scroll || ctrlKey) return;

        const { deltaX: dh, deltaY: dv } = viewConfig.scroll;
        const isHorizonScroll = deltaX !== 0;
        const scrollX = deltaX > 0 ? dh : -dh;
        const scrollY = deltaY > 0 ? dv : -dv;

        applyConfig((config) => {
          const { x, y } = config.centerAt();
          const scale = config.zoom();

          if (isHorizonScroll) config.centerAt(x + scrollX / scale, y);
          else config.centerAt(x, y + scrollY / scale);
        });
      },
      [applyConfig, viewConfig.interaction.scroll, viewConfig.scroll],
    );

    /* Visibility Handlers */
    const onLinkVisible = useCallback((link: Graph.Element.Link) => {
      return link.source.visible && link.target.visible;
    }, []);

    const onNodeVisible = useCallback((node: Graph.Element.Node) => {
      return node.visible;
    }, []);

    return (
      <>
        {children}
        <div
          onWheel={(event) => {
            onDefaultWheelScroll(event);
            onDefaultWheelZoom(event);
          }}
        >
          <ForceGraph
            /* Default Data */
            graphData={data}
            ref={internalRef}
            width={width}
            height={height}
            linkSource="sourceID"
            linkTarget="targetID"
            linkVisibility={onLinkVisible}
            nodeVisibility={onNodeVisible}
            autoPauseRedraw
            enableZoomInteraction={false} /* Zoom은 별도로 관리합니다. */
            /* Config */
            enableNodeDrag={viewConfig.interaction.drag.node}
            enablePanInteraction={viewConfig.interaction.drag.view}
            enablePointerInteraction={viewConfig.interaction.pointer}
            minZoom={viewConfig.zoom.min}
            maxZoom={viewConfig.zoom.max}
            d3AlphaDecay={nodeConfig.alphaDecay}
            /* Renderer */
            nodePointerAreaPaint={onDetermineNode}
            linkPointerAreaPaint={onDetermineLink}
            onRenderFramePre={onDrawBefore}
            onRenderFramePost={onDrawAfter}
            linkCanvasObject={onDrawLink}
            nodeCanvasObject={onDrawNode}
            /* Graph Event Handler */
            onNodeClick={onHandleEvent(Graph.Event.Type.NODE_CLICK)}
            onNodeRightClick={onHandleEvent(Graph.Event.Type.NODE_RCLICK)}
            onNodeHover={onHandleEvent(Graph.Event.Type.NODE_HOVER)}
            onNodeDrag={onHandleEvent(Graph.Event.Type.NODE_DRAG)}
            onBackgroundClick={onHandleEvent(Graph.Event.Type.BG_CLICK)}
            onBackgroundRightClick={onHandleEvent(Graph.Event.Type.BG_RCLICK)}
            onLinkClick={onHandleEvent(Graph.Event.Type.LINK_CLICK)}
            onLinkHover={onHandleEvent(Graph.Event.Type.LINK_HOVER)}
            onLinkRightClick={onHandleEvent(Graph.Event.Type.LINK_RCLICK)}
            onZoom={onHandleEvent(Graph.Event.Type.ZOOM_UPDATE)}
            onZoomEnd={onHandleEvent(Graph.Event.Type.ZOOM_END)}
          />
        </div>
      </>
    );
  },
);

GraphView.displayName = "GraphView";

export default GraphView;

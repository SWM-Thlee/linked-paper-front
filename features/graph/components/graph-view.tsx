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
import useInternalGraphFilter from "@/features/graph/hooks/internal/use-internal-graph-filter";

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
      centerConfig,
      linkConfig,
    } = useInternalGraphConfig();

    /** 그래프의 이벤트 핸들러를 관리합니다. */
    const { handleEvent, onEvent } = useInternalGraphEventHandler();

    /** 그래프 노드의 필터링을 관리합니다. */
    const { onNodeFilter, onLinkFilter, handleNodeFilter, handleLinkFilter } =
      useInternalGraphFilter();

    /* 외부에서 사용할 설정들을 정의합니다. */
    useImperativeHandle(
      handlerRef,
      () => ({
        config: {
          applyConfig,
          chargeConfig,
          collideConfig,
          centerConfig,
          linkConfig,
        },
        event: {
          onEvent,
          onNodeFilter,
          onLinkFilter,
        },
      }),
      [
        applyConfig,
        chargeConfig,
        collideConfig,
        centerConfig,
        linkConfig,
        onEvent,
        onNodeFilter,
        onLinkFilter,
      ],
    );

    /** 특정 노드의 인력/척력을 설정합니다. */
    useEffect(() => {
      chargeConfig((config) =>
        config.strength(
          (node) =>
            nodeConfig.charge[node.baseType]?.[node.type] ??
            nodeConfig.charge[node.baseType].default,
        ),
      );
    }, [chargeConfig, nodeConfig.charge]);

    /** 특정 노드의 충돌 반경을 설정합니다. */
    useEffect(() => {
      collideConfig((config) =>
        config.radius((node) => {
          return (
            nodeConfig.collision[node.baseType]?.[node.type] ??
            nodeConfig.collision[node.baseType].default
          );
        }),
      );
    }, [collideConfig, nodeConfig.collision]);

    /* 중앙 지점에 노드가 몰리지 않도록 합니다. */
    useEffect(() => {
      centerConfig((config) => config.strength(0));
    }, [centerConfig]);

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
            linkVisibility={handleLinkFilter}
            nodeVisibility={handleNodeFilter}
            enableZoomInteraction={false} /* Zoom은 별도로 관리합니다. */
            /* Config */
            enableNodeDrag={viewConfig.interaction.drag.node}
            enablePanInteraction={viewConfig.interaction.drag.view}
            enablePointerInteraction={viewConfig.interaction.pointer}
            minZoom={viewConfig.zoom.min}
            maxZoom={viewConfig.zoom.max}
            d3AlphaDecay={nodeConfig.alphaDecay}
            d3VelocityDecay={nodeConfig.velocityDecay}
            /* Renderer */
            nodePointerAreaPaint={onDetermineNode}
            linkPointerAreaPaint={onDetermineLink}
            onRenderFramePre={onDrawBefore}
            onRenderFramePost={onDrawAfter}
            linkCanvasObject={onDrawLink}
            nodeCanvasObject={onDrawNode}
            /* Graph Event Handler */
            onNodeClick={handleEvent(Graph.Event.Type.NODE_CLICK)}
            onNodeRightClick={handleEvent(Graph.Event.Type.NODE_RCLICK)}
            onNodeHover={handleEvent(Graph.Event.Type.NODE_HOVER)}
            onNodeDrag={handleEvent(Graph.Event.Type.NODE_DRAG)}
            onLinkClick={handleEvent(Graph.Event.Type.LINK_CLICK)}
            onLinkHover={handleEvent(Graph.Event.Type.LINK_HOVER)}
            onLinkRightClick={handleEvent(Graph.Event.Type.LINK_RCLICK)}
            onZoom={handleEvent(Graph.Event.Type.ZOOM_UPDATE)}
            onZoomEnd={handleEvent(Graph.Event.Type.ZOOM_END)}
            onEngineTick={handleEvent(Graph.Event.Type.ENGINE_TICK)}
            onEngineStop={handleEvent(Graph.Event.Type.ENGINE_STOP)}
          />
        </div>
      </>
    );
  },
);

GraphView.displayName = "GraphView";

export default GraphView;

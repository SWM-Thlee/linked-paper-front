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
import useInternalGraphConfig from "@/features/flower/hooks/internal/use-internal-graph-config";
import useInternalGraphEventHandler from "@/features/flower/hooks/internal/use-internal-graph-event-handler";

import { Flower } from "@/features/flower/types";
import { GraphHandler } from "../hooks/default/use-graph-handler";

type Props = {
  /** Graph View 이외의 보조 UI를 구현할 때 사용됩니다. */
  children?: React.ReactNode;

  /** 노드의 설정을 나타냅니다. */
  nodeConfig: Flower.Config.Node;

  /** 그래프 뷰 탐색 설정을 나타냅니다. */
  viewConfig: Flower.Config.View;

  /** 그래프 뷰 요소에 대한 렌더러를 나타냅니다. */
  renderer: Flower.Render.Renderer;

  /** 그래프 데이터를 나타냅니다. */
  data: Flower.Graph.Data;
};

const Graph = forwardRef<GraphHandler, Props>(
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

    const onDetermineArea: Flower.Render.DetermineArea = useCallback(
      (node, color, ctx, scale) => {
        const determineAreaFn =
          renderer.area[node.type] ?? renderer.area.default;
        determineAreaFn(node, color, ctx, scale);
      },
      [renderer.area],
    );

    const onDetermineRadius: Flower.Render.DetermineRadius = useCallback(
      (node) =>
        nodeConfig.radius[node.baseType]?.[node.type] ??
        nodeConfig.radius[node.baseType].default,
      [nodeConfig.radius],
    );

    const onDrawNode: Flower.Render.RenderNode = useCallback(
      (node, ctx, scale) => {
        const renderNodeFn = renderer.node[node.type] ?? renderer.node.default;
        renderNodeFn(node, ctx, scale);
      },
      [renderer.node],
    );

    const onDrawLink: Flower.Render.RenderLink = useCallback(
      (link, ctx, scale) => {
        const renderLinkFn =
          renderer.link[link.source.type]?.[link.target.type] ??
          renderer.link.default;

        renderLinkFn(link, ctx, scale);
      },
      [renderer.link],
    );

    const onDrawBefore: Flower.Render.RenderBefore = useCallback(
      (ctx, scale) => renderer.renderBefore?.(ctx, scale),
      [renderer],
    );

    const onDrawAfter: Flower.Render.RenderAfter = useCallback(
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
    const onLinkVisible = useCallback((link: Flower.Graph.Link) => {
      return link.source.visible && link.target.visible;
    }, []);

    const onNodeVisible = useCallback((node: Flower.Graph.Node) => {
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
            enableZoomInteraction={false} /* Zoom은 별도로 관리합니다. */
            /* Config */
            enableNodeDrag={viewConfig.interaction.drag.node}
            enablePanInteraction={viewConfig.interaction.drag.view}
            enablePointerInteraction={viewConfig.interaction.pointer}
            minZoom={viewConfig.zoom.min}
            maxZoom={viewConfig.zoom.max}
            d3AlphaDecay={nodeConfig.alphaDecay}
            /* Renderer */
            nodeVal={onDetermineRadius}
            nodePointerAreaPaint={onDetermineArea}
            onRenderFramePre={onDrawBefore}
            onRenderFramePost={onDrawAfter}
            linkCanvasObject={onDrawLink}
            nodeCanvasObject={onDrawNode}
            /* Graph Event Handler */
            onNodeClick={onHandleEvent(Flower.Event.Type.NODE_CLICK)}
            onNodeRightClick={onHandleEvent(Flower.Event.Type.NODE_RCLICK)}
            onNodeHover={onHandleEvent(Flower.Event.Type.NODE_HOVER)}
            onNodeDrag={onHandleEvent(Flower.Event.Type.NODE_DRAG)}
            onBackgroundClick={onHandleEvent(Flower.Event.Type.BG_CLICK)}
            onBackgroundRightClick={onHandleEvent(Flower.Event.Type.BG_RCLICK)}
            onLinkClick={onHandleEvent(Flower.Event.Type.LINK_CLICK)}
            onLinkHover={onHandleEvent(Flower.Event.Type.LINK_HOVER)}
            onLinkRightClick={onHandleEvent(Flower.Event.Type.LINK_RCLICK)}
            onZoom={onHandleEvent(Flower.Event.Type.ZOOM_UPDATE)}
            onZoomEnd={onHandleEvent(Flower.Event.Type.ZOOM_END)}
          />
        </div>
      </>
    );
  },
);

Graph.displayName = "Graph";

export default Graph;
import { Default, Optional } from "@/utils/type-helper";
import { BaseNodeType, NodeType } from "./element";

/** 그래프 내 특정 범위를 나타냅니다. */
export const GraphBoundary = {
  ROOT: "root",
  GROUP: "group",
  ALL: "all",
} as const;

export type GraphBoundary = (typeof GraphBoundary)[keyof typeof GraphBoundary];

/** 그래프 뷰 내 Node에 대한 설정입니다.  */
export type Node = {
  /** 특정 노드의 충돌 값을 정의합니다. */
  collision: {
    [K in BaseNodeType]: Default<number> & {
      [type: NodeType]: number;
    };
  };

  /** 특정 노드의 반발력 / 인력 값을 정의합니다. */
  charge: {
    [K in BaseNodeType]: Default<number> & {
      [type: NodeType]: number;
    };
  };

  /** 물리 엔진에서 인지하는 각 Node의 반경을 정의합니다. */
  radius: {
    [K in BaseNodeType]: Default<number> & {
      [type: NodeType]: number;
    };
  };

  link: {
    distance: Default<number> & {
      [source in NodeType]: {
        [target in NodeType]: number;
      };
    };

    /** 특정 Node와 Link 사이의 거리를 정의합니다.  */
    distanceFromCenter: {
      [K in BaseNodeType]: Default<number> & {
        [type: NodeType]: number;
      };
    };
  };

  /** Node 간 상호작용 시 감쇠율을 정의합니다. */
  alphaDecay: number;
  velocityDecay: number;
};

export type NodePatcher = Optional<Node>;

/** 그래프 뷰를 탐색할 때의 설정입니다. */
export type View = {
  zoom: {
    min: number;
    max: number;
    delta: number;

    /** 특정 범위에 포커스할 때의 옵션입니다. */
    focus: {
      duration: number;
      /** zoom 배율에 따라 유동적으로 duration을 조절합니다. */
      adjustDurationByZoom: boolean;
    };
  };

  scroll: {
    deltaX: number;
    deltaY: number;
  };

  graph: {
    viewSimilarity: boolean;
  };

  /** 사용자가 뷰와 상호작용할 때 적용되는 옵션입니다. */
  interaction: {
    drag: {
      node: boolean;
      view: boolean;
    };
    zoom: boolean;
    pointer: boolean;
    scroll: boolean;
  };
};

/** 기본 설정으로부터 특정 부분만 변경하고자 할 때 사용됩니다. */
export type ViewPatcher = Optional<View>;

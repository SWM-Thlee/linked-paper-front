import { Signature } from "@/utils/signature";
import { FilterTag } from "./tag";

export type BaseData<T extends string> = {
  featureID: T;
  readonly dataID: `${T}-${Signature}`;

  /** Filter Data를 **사용자 입장**에서 식별하기 위한 이름입니다. */
  name: string;

  /**
   * Filter의 추가 성질을 표시하기 위해 사용됩니다.
   *
   * **예시:**
   *
   * 1. 어떤 Filter Data는 Persist Store에 안정적으로 위치할 수도 있지만,
   * 특정 Filter를 편집하는 경우 원본에서 바로 수정하지 않고 Snapshot을 생성 후 임시 저장소에 위치하게 됩니다.
   *
   * 2. Search Query에 명시된 Filter 정보는 해당 검색 페이지에 의존하므로, 임시 저장소에 위치하게 됩니다.
   */
  tags: FilterTag;
};

export type BaseFilter<T extends string, U extends BaseData<T>> = Record<
  U["dataID"],
  U
>;

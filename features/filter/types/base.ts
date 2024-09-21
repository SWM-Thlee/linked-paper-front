import { Signature } from "@/utils/signature";

/**
 * 각 Tag는 용도에 따라 다음 그룹으로 나뉩니다.
 * 서로 다른 그룹끼리는 공존이 가능하지만, 같은 그룹 내의 Tag와는 공존이 불가능합니다.
 *
 * - **TAG_GROUP_STATUS**: [EDIT, SNAPSHOT]
 *
 * - **TAG_GROUP_ROLE**: [PRESET, QUERY, DEFAULT]
 */
export interface Tags {
  [tag: string]: { [extra: string]: string | number | boolean };
}

export type Data<T extends string> = {
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
  tags: Tags;
};

export type Filters<T extends string, U extends Data<T>> = Record<
  U["dataID"],
  U
>;

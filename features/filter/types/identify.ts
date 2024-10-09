import * as Base from "./base";
import * as Builder from "./filter";

export const Tag = {
  EDIT: "EDIT",
  SNAPSHOT: "SNAPSHOT",
  PRESET: "PRESET",
  QUERY: "QUERY",
  DEFAULT: "DEFAULT",
} as const;
export type Tag = (typeof Tag)[keyof typeof Tag];

export const TagGroup = {
  STATUS: [Tag.EDIT, Tag.SNAPSHOT],
  ROLE: [Tag.PRESET, Tag.QUERY, Tag.DEFAULT],
} as const;
export type TagGroup = {
  [key in keyof typeof TagGroup]: (typeof TagGroup)[key][number];
};

export type Strategy<T extends Builder.FeatureID> = {
  /**
   * 특정 DataID의 매치 여부를 나타냅니다.
   *
   * - 명시되지 않은 경우 **모두** 통과합니다.
   * - 하나만 명시된 경우 해당 Filter만 통과하므로, **특정 Filter**를 불러오는 것과 같습니다.
   * - 여러 개가 명시된 경우 **그 중에 하나만 매치되어도** 통과합니다. (OR)
   */
  dataID?: Builder.DataID<T>[];

  /**
   * Filter에 별도로 명시된 Tag 정보의 매치 여부를 나타냅니다.
   * 이때, 여러 개 명시된 경우 이들이 **모두 통과**되어야 합니다. (AND)
   *
   * - **string**: 해당 Tag의 존재 여부만 판단합니다. (INCLUDE)
   * - **[string]**: 해당 Tag가 존재하지 않아야 합니다. (EXCLUDE)
   * - **[string, FilterTag[string]]**: 특정 Tag 내 세부 정보와 **모두 일치**하여야 합니다. (INCLUDE)
   */
  tag?: (string | [string] | [string, Base.Tags[string]])[];
};

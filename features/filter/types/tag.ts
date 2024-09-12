/**
 * 각 Tag는 용도에 따라 다음 그룹으로 나뉩니다.
 * 서로 다른 그룹끼리는 공존이 가능하지만, 같은 그룹 내의 Tag와는 공존이 불가능합니다.
 *
 * - **TAG_GROUP_STATUS**: [EDIT, SNAPSHOT]
 *
 * - **TAG_GROUP_ROLE**: [PRESET, QUERY, DEFAULT]
 */
export interface FilterTag {
  [tag: string]: { [extra: string]: string | number | boolean };
}

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

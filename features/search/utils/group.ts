import { SUB_ID_DESC, SUB_TO_TOP } from "@/utils/field-mappings";

// 하위 분류에 대한 상세 설명을 반환합니다.
export function description(sub: string) {
  return SUB_ID_DESC[sub] ?? "";
}

export type FieldGroup = {
  [group: string]: string[];
};

// 상위 분류를 기준으로 그룹화합니다.
export function group(fieldIds: string[]) {
  return fieldIds
    .filter((field) => SUB_TO_TOP[field])
    .map((field) => [field, SUB_TO_TOP[field]])
    .reduce<FieldGroup>(
      (result, [currentFieldName, currentGroupName]) => ({
        ...result,
        [currentGroupName]: [
          ...(result[currentGroupName] ?? []),
          currentFieldName,
        ],
      }),
      {},
    );
}

// 특정 논문의 여러 분류를 간략화한 대표 분류를 반환합니다.
export function representative(fieldGroup: FieldGroup) {
  const [count, result] = Object.entries(fieldGroup).reduce<[number, string]>(
    ([maxCount, dominantGroupName], [currentGroupName, currentGroup]) =>
      maxCount > currentGroup.length
        ? [maxCount, dominantGroupName]
        : [currentGroup.length, currentGroupName],
    [0, "Unclassified"],
  );

  // 우세한 상위 분류 내 하위 분류가 하나이거나, 상위 분류가 유효하지 않은 경우 가장 앞의 하위 분류를 반환합니다.
  return count === 1 ? description(fieldGroup[result][0]) : result;
}

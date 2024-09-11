import { Category } from "@/utils/category";

export type CategoryGroup = {
  [group: string]: string[];
};

// 상위 분류를 기준으로 그룹화합니다.
export function group(categoryIds: string[]) {
  return categoryIds
    .filter((category) => Category[category])
    .map((category) => [category, Category[category]] as const)
    .reduce<CategoryGroup>(
      (result, [categoryID, { subject }]) => ({
        ...result,
        [subject]: [...(result[subject] ?? []), categoryID],
      }),
      {},
    );
}

// 특정 논문의 여러 분류를 간략화한 대표 분류를 반환합니다.
export function representative(categoryGroup: CategoryGroup) {
  const [count, result] = Object.entries(categoryGroup).reduce<
    [number, string]
  >(
    ([maxCount, dominantGroupName], [currentGroupName, currentGroup]) =>
      maxCount > currentGroup.length
        ? [maxCount, dominantGroupName]
        : [currentGroup.length, currentGroupName],
    [0, "Unclassified"],
  );

  // 우세한 상위 분류 내 하위 분류가 하나이거나, 상위 분류가 유효하지 않은 경우 가장 앞의 하위 분류를 반환합니다.
  return count === 1
    ? Category[categoryGroup[result][0]]?.description ?? ""
    : result;
}

import { useCallback, useMemo } from "react";

import { Category, Subject } from "@/utils/paper/category";

export type CategoryGroup = {
  [subject: string]: Category;
};

export const CategoryUnknown = "Unknown";

// TODO: 이후 서버와 연동하는 형태로 구현할 예정입니다.
/**
 * Category의 정보는 기본적으로 Local에 저장되지만, 주기적으로 서버와 상호작용하여 최신화를 거칩니다.
 *
 * 즉, 최종적인 설계에서 Category의 정보는 **Server State**에 해당됩니다.
 */
export default function useCategories(custom?: {
  subject: typeof Subject;
  category: typeof Category;
}) {
  const resolvedSubject = useMemo(
    () => custom?.subject ?? Subject,
    [custom?.subject],
  );

  const resolvedCategory = useMemo(
    () => custom?.category ?? Category,
    [custom?.category],
  );

  /**
   * Subject 내에 해당하는 모든 Category를 불러옵니다.
   */
  const getCategories = useCallback(
    (subject: string) => resolvedSubject[subject] ?? {},
    [resolvedSubject],
  );

  const getSubjects = useCallback(
    () => Object.keys(resolvedSubject),
    [resolvedSubject],
  );

  /**
   * 특정 Category의 정보를 불러옵니다.
   *
   * **참고**: Filter 내에도 설명이 존재하므로, 이를 초기 데이터로 사용하세요.
   */
  const getInfo = useCallback(
    (categoryID: string): Category[string] | undefined =>
      resolvedCategory[categoryID],
    [resolvedCategory],
  );

  /**
   * Subject를 기준으로 그룹화합니다.
   *
   * @param includeUnknown Unknown Category의 포함 여부를 나타냅니다. 이때, 포함하는 경우 Subject는 "Unknown"으로 표시됩니다.
   */
  const getGroups = useCallback(
    (categoryIDs: string[], includeUnknown: boolean = false) => {
      return categoryIDs
        .map(
          (categoryID) =>
            [
              categoryID,
              getInfo(categoryID) ?? {
                subject: CategoryUnknown,
                description: "",
              },
            ] as const,
        )
        .reduce<CategoryGroup>(
          (result, [categoryID, { subject, description }]) => {
            if (!includeUnknown && subject === CategoryUnknown) return result;

            return {
              ...result,
              [subject]: {
                ...(result[subject] ?? {}),
                [categoryID]: { subject, description },
              },
            };
          },
          {},
        );
    },
    [getInfo],
  );

  /**
   * 대표 Subject (또는 Category)를 반환합니다.
   *
   * **참고:** Unknown 그룹은 포함되지 않습니다.
   */
  const getRepresentative = useCallback(
    (categoryGroup: CategoryGroup) => {
      const [count, subject] = Object.entries(categoryGroup).reduce<
        [number, string]
      >(
        ([maxCount, dominantSubject], [currentSubject, currentGroup]) => {
          if (currentSubject === CategoryUnknown)
            return [maxCount, dominantSubject];

          const currentGroupSize = Object.keys(currentGroup).length;
          return maxCount > currentGroupSize
            ? [maxCount, dominantSubject]
            : [currentGroupSize, currentSubject];
        },
        [0, "Unclassified"],
      );

      if (count === 0) return null;

      // 우세한 상위 분류 내 하위 분류가 하나이거나, 상위 분류가 유효하지 않은 경우 가장 앞의 하위 분류를 반환합니다.
      return count === 1
        ? getInfo(Object.keys(categoryGroup[subject])[0])?.description ?? null
        : subject;
    },
    [getInfo],
  );

  return { getInfo, getSubjects, getCategories, getGroups, getRepresentative };
}

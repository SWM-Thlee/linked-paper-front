import { useCallback, useMemo } from "react";
import { Category, Subject } from "@/utils/category";

// 이후 서버와 연동하는 형태로 구현할 예정입니다.
export default function useCategories() {
  const subjects = useMemo(() => Object.keys(Subject), []);

  const categories = useCallback(
    (subject: string) => Subject[subject] ?? {},
    [],
  );

  const index = useCallback(
    (categoryID: string): Category[string] | undefined => Category[categoryID],
    [],
  );

  return { index, subjects, categories };
}

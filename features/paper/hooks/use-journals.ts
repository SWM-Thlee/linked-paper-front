import { useMemo } from "react";
import { Journal } from "@/features/paper/utils/journal";

// TODO: 이후 서버와 연동하는 형태로 구현할 예정입니다.
export default function useJournals() {
  const journals = useMemo(() => Journal, []);
  return { journals };
}

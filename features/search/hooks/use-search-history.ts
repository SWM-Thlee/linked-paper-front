import { useState } from "react";
import { random, repeat } from "@/utils/sample";
import { searchHistory } from "../utils/sample";

export default function useSearchHistory() {
  // 현재는 샘플 데이터를 가지고 옵니다.
  const [history] = useState(repeat(random(1, 10), searchHistory));
  return history;
}

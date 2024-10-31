import { signature } from "@/utils/signature";
import { Analytics } from "../types";

export const PERSIST_KEY = "LINKED_PAPER_ANALYTICS_USER_ID";

// 사용자 지표 분석에 필요한 사용자 ID를 가져오거나 생성합니다.
export function getAnalyticsUserId() {
  if (typeof window === undefined) return null;

  const value = localStorage.getItem(PERSIST_KEY);

  if (!value) {
    const userId = `user:${signature()}` as const;
    localStorage.setItem(PERSIST_KEY, userId);

    return userId;
  }

  return value as Analytics.Track.UserId;
}

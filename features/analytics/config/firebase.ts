import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  Analytics,
  getAnalytics as getFirebaseAnalytics,
  setUserId,
} from "firebase/analytics";
import { UserId } from "../types/track";

/**
 * Firebase Analytics에 접근하기 위한 환경 설정입니다.
 *
 * 참고: Client에서 접근해야 하므로, NEXT_PUBLIC 접두사를 붙여 env 정보를 Client에서도 접근할 수 있도록 합니다.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function canAnalyze(
  analyticsObj: Analytics | null,
): analyticsObj is Analytics {
  return typeof window !== undefined && analyticsObj !== null;
}

export function createAnalytics(userId?: UserId) {
  // Server에서는 Analytics를 불러올 수 없습니다.
  if (typeof window === undefined) return null;

  const app = initializeApp(firebaseConfig);
  const analytics = getFirebaseAnalytics(app);

  // 사용자 ID를 설정합니다.
  if (userId) {
    setUserId(analytics, userId);
  }

  return analytics;
}

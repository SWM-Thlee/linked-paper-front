import { isServer } from "@tanstack/react-query";

export type SuccessResponse<T> = {
  status: "OK";
  data: T;
};

export type ErrorResponse = {
  status: "ERROR";
  errorCode?: number;
};

export type UniversalResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * - Client에서 호출 : Rewrite 과정을 통해 API 호출
 * - Server에서 호출 : 직접 API Endpoint를 대입하여 절대 경로로 호출
 */
function resolveCaller(input: string) {
  if (isServer)
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${input.replace("api/", "")}`;
  return input;
}

/**
 * Explicitly Typing을 통해 Server Response를 어느 영역에서나 안전하게 다룰 수 있도록 합니다.
 */
export async function api<T>(
  input: string,
  init?: RequestInit,
): Promise<UniversalResponse<T>> {
  const response = await fetch(resolveCaller(input), init);

  return response.ok
    ? { status: "OK", data: await response.json() }
    : { status: "ERROR", errorCode: response.status };
}

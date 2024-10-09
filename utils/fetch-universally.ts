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
 * Explicitly Typing을 통해 Server Response를 어느 영역에서나 안전하게 다룰 수 있도록 합니다.
 */
export async function fetchUniversally<T>(
  ...params: Parameters<typeof fetch>
): Promise<UniversalResponse<T>> {
  const response = await fetch(...params);

  return response.ok
    ? { status: "OK", data: await response.json() }
    : { status: "ERROR", errorCode: response.status };
}

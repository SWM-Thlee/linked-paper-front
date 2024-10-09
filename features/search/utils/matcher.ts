interface MatchOption {
  target: string;

  /** 대소문자를 무시합니다. */
  ignoreCase?: boolean;

  /** 공백을 무시합니다. */
  ignoreSpace?: boolean;
}

interface KeywordMatchOption extends MatchOption {
  include?: string[];
  exclude?: string[];
}

function resolve({ target, ignoreCase, ignoreSpace }: MatchOption) {
  let result = target;

  if (ignoreCase) result = result.toLowerCase();
  if (ignoreSpace) result = result.replace(/\s/g, "");

  return result;
}

/**
 * 키워드 매칭 방식
 *
 * @param ignoreCase 대소문자를 구분하지 않습니다.
 * @param ignoreSpace 공백 포함 여부는 판단하지 않습니다.
 */
export function matches({
  target,
  include = [],
  exclude = [],
  ignoreCase,
  ignoreSpace,
}: KeywordMatchOption) {
  const resolved = resolve({ target, ignoreCase, ignoreSpace });
  const checkInclusion = include.every((keyword) =>
    resolved.includes(resolve({ target: keyword, ignoreCase, ignoreSpace })),
  );
  const checkExclusion = exclude.every(
    (keyword) =>
      !resolved.includes(resolve({ target: keyword, ignoreCase, ignoreSpace })),
  );

  return checkInclusion && checkExclusion;
}

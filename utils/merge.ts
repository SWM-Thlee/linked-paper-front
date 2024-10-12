import { Optional } from "./type-helper";

export function merge<T extends object>(a: T, b: Optional<T>): T {
  const result = { ...a };
  if (!b) return result;

  Object.entries(b).forEach(([key, value]) => {
    if (!Object.hasOwn(b, key)) return;
    const prevValue = a[key as keyof typeof a];

    if (prevValue instanceof Object && value instanceof Object) {
      Object.assign(result, { [key]: merge(prevValue, value) });
    } else {
      Object.assign(result, { [key]: value });
    }
  });

  return result;
}

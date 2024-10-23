export function toArray<T>(value?: T | T[]) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  return [value];
}

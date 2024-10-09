/**
 * 객체의 특정 Attribute를 수정하는 것을 막습니다.
 */
export default function BlockModification<T extends object>(
  obj: T,
  ...attributesToBlock: (keyof T)[]
) {
  return new Proxy(obj, {
    set(target, prop, newValue) {
      // false (또는 falsy) 값을 반환할 경우 Error가 발생합니다.
      if (attributesToBlock.includes(prop as keyof T)) {
        return false;
      }

      target[prop as keyof T] = newValue;
      return true;
    },
  });
}

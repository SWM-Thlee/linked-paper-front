import { v4 as uuidv4 } from "uuid";

// Typescript Skills 중 하나인 Branding입니다.
// 평소에 사용할 땐 string과 동일하지만, 매개변수 타입 등 지정 시 아래 함수에서 나온 결과물로 한정시킬 수 있습니다.
export type Signature = string & { readonly __signature: unique symbol };

export function signature() {
  return uuidv4() as Signature;
}

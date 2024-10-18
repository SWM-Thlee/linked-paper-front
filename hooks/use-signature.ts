import { signature, Signature } from "@/utils/signature";
import { useRef } from "react";

export type IDWithSignature<T extends string> = `${T}-${Signature}`;

export default function useSignature<const T extends string>(id: T) {
  const ref = useRef<IDWithSignature<T>>(`${id}-${signature()}`);
  return ref.current;
}

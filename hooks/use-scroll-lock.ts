import { scrollLockAtom } from "@/components/body-with-scroll-lock";
import { useAtom } from "jotai";

export default function useScrollLock() {
  return useAtom(scrollLockAtom);
}

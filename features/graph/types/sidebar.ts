import { Signature } from "@/utils/signature";

export type Id = `${string}-${Signature}`;

export type Info = { [id: Id]: object };

export type Context = {
  hasSidebar: boolean;
  registerSidebar: (id: Id) => void;
  unregisterSidebar: (id: Id) => void;
  sidebarInfo: Info;
};

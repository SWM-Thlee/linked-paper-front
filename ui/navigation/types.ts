export type NavigationModule = {
  key: string;
  title: React.ReactNode;
} & (
  | {
      type: "link";
      href: string;
    }
  | { type: "dropdown"; content: React.ReactNode }
);

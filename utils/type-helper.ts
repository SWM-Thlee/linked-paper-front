export type Default<T> = { default: T };

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Optional<T> = T extends (...args: any[]) => any
  ? T | undefined
  : T extends object
    ? {
        [key in keyof T]?: Optional<T[key]>;
      }
    : T | undefined;

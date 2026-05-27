import type { Dictionary } from "./dictionaries/en";

export type { Dictionary };

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends ReadonlyArray<infer _U>
    ? T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

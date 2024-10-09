const Type = { LIGHT: "light", DARK: "dark" } as const;
export type Type = (typeof Type)[keyof typeof Type];
export const { LIGHT, DARK } = Type;

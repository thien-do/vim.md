const getLast = (path: string): string => path.split("/").slice(-1)[0];

export const pathUtils = { getLast };

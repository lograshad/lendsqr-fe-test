export const QUERY_KEYS = {
  users: "users",
  organizations: "organizations",
} as const;

export type QueryKeys = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];

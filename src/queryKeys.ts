export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const,
  },
  products: {
    list: ["products", "list"] as const,
    search: (q: string) => ["products", "search", q] as const,
  },
};

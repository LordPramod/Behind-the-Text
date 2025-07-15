import { QueryClient } from "@tanstack/react-query";

export const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 30 * 1000, // 30 seconds
  },
};

export const QueryProvider = new QueryClient({
  defaultOptions,
});

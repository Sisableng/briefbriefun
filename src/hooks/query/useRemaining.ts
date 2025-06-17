"use client";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const invalidateRemaining = async (userId: string) => {
  const queryClient = useQueryClient();

  await queryClient.invalidateQueries({
    queryKey: ["client-remaining", userId],
  });
};

export const useRemaining = (userId: string) => {
  return useQuery({
    queryKey: ["client-remaining", userId],
    queryFn: async () => {
      const res = await fetch("/api/remaining");
      const data = await res.json();

      return data as { remaining: number };
    },
  });
};

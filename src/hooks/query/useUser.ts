import { useQuery } from "@tanstack/react-query";
import { getUser } from "../actions/user";
import { authClient } from "@/lib/auth-client";

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: ["db-user", userId],
    queryFn: async () => await getUser(userId),
    enabled: !!userId,
  });
};

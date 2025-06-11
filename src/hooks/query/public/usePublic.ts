import { useQuery } from "@tanstack/react-query";
import {
  getProjectCountAction,
  getTopUsersWithMostProjects,
  getUserCountAction,
} from "./actions";

export const usePublicProjectCountQuery = () => {
  return useQuery({
    queryKey: ["public-project-count"],
    queryFn: getProjectCountAction,
  });
};

export const usePublicUserCountQuery = () => {
  return useQuery({
    queryKey: ["public-user-count"],
    queryFn: getUserCountAction,
  });
};

export const usePublicUserTop3Query = () => {
  return useQuery({
    queryKey: ["public-user-top"],
    queryFn: getTopUsersWithMostProjects,
  });
};

export const usePublic = () => {
  const projectCount = usePublicProjectCountQuery();
  const userCount = usePublicUserCountQuery();

  return { projectCount, userCount };
};

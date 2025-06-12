import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectAction,
  deleteProjectAction,
  getProjectAction,
  getProjectCountAction,
  ProjectQueryOptions,
  updateProjectAction,
} from "@/components/forms/projects/actions";
import {
  CreateProject,
  ProjectStatus,
} from "@/components/forms/projects/schema";

export const useProjectCountQuery = (
  userId?: string,
  options?: ProjectQueryOptions,
) => {
  return useQuery({
    queryKey: ["db-count-projects", userId, options],
    queryFn: () => getProjectCountAction(userId, options),
    enabled: options?.withCount && !!userId,
  });
};

export const useProjectQuery = (
  userId?: string,
  options?: ProjectQueryOptions,
) => {
  return useQuery({
    queryKey: ["db-projects", userId, options],
    queryFn: () => getProjectAction(userId, options),
    enabled: !!userId,
  });
};

export const useProjectMutations = (userId?: string) => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: CreateProject) => createProjectAction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["db-projects", userId],
        exact: true,
        refetchType: "active",
      });
    },
  });

  const update = useMutation({
    mutationFn: (data: { status: ProjectStatus; projectId: string }) =>
      updateProjectAction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["db-projects", userId],
        exact: true,
        refetchType: "active",
      });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (projectId: string) => deleteProjectAction(projectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["db-projects", userId],
        exact: true,
        refetchType: "active",
      });
    },
  });

  return {
    create,
    update,
    deleteProject,
  };
};

export const useProject = (userId?: string, options?: ProjectQueryOptions) => {
  const count = useProjectCountQuery(userId, options);
  const project = useProjectQuery(userId, options);
  const mutations = useProjectMutations(userId);

  return {
    project,
    count,
    ...mutations,
  };
};

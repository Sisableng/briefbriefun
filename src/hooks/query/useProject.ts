import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProjectAction,
  deleteProjectAction,
  getProjectAction,
  updateProjectAction,
} from "@/components/forms/projects/actions";
import {
  CreateProject,
  ProjectStatus,
} from "@/components/forms/projects/schema";

export const useProjectQuery = (
  userId?: string,
  options?: {
    projectId?: string;
    page?: number;
    pageSize?: number;
  },
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["db-projects", userId],
        exact: true,
        refetchType: "active",
      });
    },
  });

  const update = useMutation({
    mutationFn: (data: { status: ProjectStatus; projectId: string }) =>
      updateProjectAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["db-projects", userId],
        exact: true,
        refetchType: "active",
      });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (projectId: string) => deleteProjectAction(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
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

export const useProject = (
  userId?: string,
  options?: {
    projectId?: string;
    page?: number;
    pageSize?: number;
  },
) => {
  const project = useProjectQuery(userId, options);
  const mutations = useProjectMutations(userId);

  return {
    project,
    ...mutations,
  };
};

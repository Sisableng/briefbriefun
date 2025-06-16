"use client";
import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/query/auth-hooks";
import { useProject } from "@/hooks/query/useProject";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ProjectStatus } from "@/components/forms/projects/schema";
import { toast } from "sonner";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { useRouter } from "@bprogress/next/app";
import clsx from "clsx";
import { getIndustryName, getTypeName } from "@/lib/getCategoryName";

const ProjectField = dynamic(
  () => import("@/components/me/project/ProjectField"),
  { ssr: false },
);
const Markdown = dynamic(() => import("react-markdown"), { ssr: false });
const StatusBadge = dynamic(
  () => import("@/components/me/project/StatusBadge"),
  { ssr: false },
);
const DrawerResponsive = dynamic(
  () => import("@/components/ui/drawer-responsive"),
  { ssr: false },
);

const LoadingSkeleton = dynamic(
  () => import("@/components/forms/projects/LoadingSkeleton"),
  {
    ssr: false,
  },
);

export default function DetailProjectPage() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const params = useParams();
  const projectId = params.projectId as string;

  const router = useRouter();

  const { user } = useSession();

  const mdScreen = useMediaQuery(mq("md"));

  const {
    project,
    update: { mutateAsync },
    deleteProject: { mutateAsync: deleteProjectMutation, isPending },
  } = useProject(user?.id, {
    projectId: projectId,
  });

  const data = useMemo(() => {
    if (project.data && project.data?.length > 0) {
      return project.data[0];
    }
    return null;
  }, [project.data]);

  const handleUpdateStatus = async (status: ProjectStatus) => {
    const toastId = toast.loading("Sabar...");
    try {
      await mutateAsync({
        status,
        projectId,
      });

      await project.refetch();

      toast.success("Berhasil! 😎", {
        id: toastId,
      });
    } catch (error) {
      console.error(error);

      toast.error("Waduh, keknya ada yang salah! 😱", {
        id: toastId,
      });
    }
  };

  const handleDeleteProject = async () => {
    const toastId = toast.loading("Sabar...");
    try {
      await deleteProjectMutation(projectId);

      await project.refetch();

      toast.success("Berhasil! 😎", {
        id: toastId,
      });

      setIsOpenDelete(false);

      router.push("/me");
    } catch (error) {
      console.error(error);

      toast.error("Waduh, keknya ada yang salah! 😱", {
        id: toastId,
      });
    }
  };

  return (
    <div className="cme-content flex flex-col items-center space-y-8">
      <div className="flex w-full items-center justify-between gap-4">
        <BackButton />

        {data && (
          <>
            <div className="bg-secondary/80 md:bg-secondary/80 dark fixed inset-x-0 bottom-0 mx-auto flex max-w-sm items-center gap-3 rounded-t-xl p-4 backdrop-blur md:bottom-4 md:w-max md:rounded-full md:p-2">
              {data.status === "draft" && (
                <Button
                  size={"default"}
                  variant={"default"}
                  onClick={() => handleUpdateStatus("inProgress")}
                  className="max-sm:w-full max-sm:flex-1"
                >
                  Kerjain Sekarang 😎
                </Button>
              )}
              {data.status === "inProgress" && (
                <Button
                  size={"default"}
                  variant={"default"}
                  onClick={() => handleUpdateStatus("completed")}
                  className="max-sm:w-full max-sm:flex-1"
                >
                  Udah Beres! 💪
                </Button>
              )}
              {data.status === "completed" && (
                <Button
                  size={"default"}
                  variant={"default"}
                  onClick={() => handleUpdateStatus("draft")}
                  className="max-sm:w-full max-sm:flex-1"
                >
                  Jadiin Draft 😊
                </Button>
              )}

              {/* {!mdScreen && (
              )} */}
              <Button
                size={"icon"}
                variant={"secondary"}
                className="text-destructive"
                onClick={() => setIsOpenDelete(true)}
              >
                <TrashIcon />
              </Button>
            </div>

            {/* {!mdScreen && (
            )} */}
            <StatusBadge
              status={data.status as any}
              className="h-9 px-3 py-1 text-sm font-semibold"
            />
          </>
        )}
      </div>

      <div className="max-w-3xl space-y-8">
        {project.isLoading ? (
          <div className="max-w-2xl space-y-8">
            <LoadingSkeleton />
          </div>
        ) : (
          data && (
            <>
              <div className="space-y-2">
                {data.title && <h2>{data.title}</h2>}
                {data.description && (
                  <p className="text-muted-foreground">{data.description}</p>
                )}
              </div>

              {data.clientName && (
                <ProjectField title="Client">
                  <p>{data.clientName}</p>
                </ProjectField>
              )}

              {(data.type || data.industry || data.deadline) && (
                <div className="flex flex-wrap justify-between gap-8">
                  {data.type && (
                    <ProjectField title="Tipe">
                      <p>{getTypeName(data.type)}</p>
                    </ProjectField>
                  )}

                  {data.industry && (
                    <ProjectField title="Industri">
                      <p>{getIndustryName(data.industry)}</p>
                    </ProjectField>
                  )}

                  {data.deadline && (
                    <ProjectField title="Deadline">
                      <p>{data.deadline}</p>
                    </ProjectField>
                  )}
                </div>
              )}

              {data.content && (
                <>
                  <Separator />
                  <div className="prose dark:prose-invert">
                    <Markdown>{data.content}</Markdown>
                  </div>
                </>
              )}
            </>
          )
        )}
      </div>

      <DrawerResponsive
        title={"Kamu yakin?"}
        description="Yakin nih mau hapus project ini?"
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
      >
        <div>
          <p className="text-muted-foreground text-sm">
            Aksi ini gabisa dibatalin lho, kalo udah kehapus yaudah ngilang
            selamanya, kamu yakin?
          </p>
        </div>

        <div
          className={clsx(
            "mt-auto flex items-center gap-2",
            isPending ? "justify-center" : "justify-end",
          )}
        >
          {isPending ? (
            <>
              <p className="animate-pulse">Lagi ngapus...</p>
              <LoaderCircleIcon className="text-primary animate-spin" />
            </>
          ) : (
            <>
              <Button
                variant={"secondary"}
                className="max-sm:w-full max-sm:flex-1"
                onClick={() => setIsOpenDelete(false)}
                disabled={isPending}
              >
                G jadi deng
              </Button>
              <Button
                className="max-sm:w-full max-sm:flex-1"
                onClick={handleDeleteProject}
                disabled={isPending}
              >
                Y
              </Button>
            </>
          )}
        </div>
      </DrawerResponsive>
    </div>
  );
}

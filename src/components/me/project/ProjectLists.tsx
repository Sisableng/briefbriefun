import React, { FC, useCallback, useState } from "react";
import CardProject from "./CardProject";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
  LoaderCircleIcon,
  SearchIcon,
  SquareDashedIcon,
  SquareDashedMousePointerIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useProject } from "@/hooks/query/useProject";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import DrawerResponsive from "@/components/ui/drawer-responsive";
import clsx from "clsx";

interface ProjectListsProps {
  userId: string;
}

const LoadingElement = () => {
  return [...Array(3)].map((_, index) => (
    <Skeleton key={index} className="h-60" />
  ));
};

const ErrorElement = () => {
  return (
    <div className="text-muted-foreground col-span-full grid min-h-60 place-content-center gap-4 text-center">
      <h2>Yah :(</h2>
      <p>Datanya lagi ngambek. Coba lagi nanti ya!</p>
    </div>
  );
};

const EmptyElement = () => {
  return (
    <div className="col-span-full grid min-h-60 place-content-center gap-4 text-center">
      <h2>Masih Kosong nih.</h2>

      <Button className="mx-auto w-max" asChild>
        <Link href={"/me/create-brief"}>
          Yuk mulai bikin Brief!
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
};

const ProjectLists = ({ userId }: ProjectListsProps) => {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<any[]>([]);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const {
    project: { data, isPending, error, refetch },
    deleteProject: {
      mutateAsync: deleteProjectMutation,
      isPending: isPendingDelete,
    },
  } = useProject(userId, {
    pageSize: 10,
  });

  // Optimized handler with useCallback to prevent unnecessary re-renders
  const handleSelectProject = useCallback(
    (checked: boolean, projectId: string) => {
      setSelectedProjects((prev) => {
        if (checked) {
          // Only add if not already selected
          return prev.includes(projectId) ? prev : [...prev, projectId];
        } else {
          // Remove from selection
          return prev.filter((id) => id !== projectId);
        }
      });
    },
    [],
  );

  // Helper function to check if project is selected
  const isProjectSelected = useCallback(
    (projectId: string) => {
      return selectedProjects.includes(projectId);
    },
    [selectedProjects],
  );

  // Clear all selections
  const handleClearSelection = useCallback(() => {
    setSelectedProjects([]);
  }, []);

  // Select all projects
  const toggleSelectAll = useCallback(() => {
    if (!data) return;
    const allProjectIds = data.map((project) => project.id);
    if (selectedProjects.length === allProjectIds.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(allProjectIds);
    }
  }, [data, selectedProjects]);

  // Toggle select mode and clear selection when disabled
  const toggleSelectMode = useCallback(() => {
    setSelectMode((prev) => {
      if (prev) {
        setSelectedProjects([]); // Clear selection when exiting select mode
      }
      return !prev;
    });
  }, []);

  const handleDeleteBulkAction = useCallback(async () => {
    if (selectedProjects.length === 0) {
      toast.error("Pilih project yang mau dihapus dulu ya!");
      return;
    }

    const toastId = toast.loading(
      `Menghapus ${selectedProjects.length} project...`,
    );

    try {
      // Use Promise.allSettled to handle partial failures gracefully
      const deleteResults = await Promise.allSettled(
        selectedProjects.map((projectId) => deleteProjectMutation(projectId)),
      );

      // Separate successful and failed deletions
      const successfulDeletions: string[] = [];
      const failedDeletions: { id: string; error: any }[] = [];

      deleteResults.forEach((result, index) => {
        const projectId = selectedProjects[index];

        if (result.status === "fulfilled") {
          successfulDeletions.push(projectId);
        } else {
          failedDeletions.push({
            id: projectId,
            error: result.reason,
          });
        }
      });

      // Log failed deletions for debugging
      if (failedDeletions.length > 0) {
        console.error("Failed deletions:", failedDeletions);
      }

      // Refetch data regardless of partial failures
      await refetch();

      // Handle different scenarios
      if (failedDeletions.length === 0) {
        // All successful
        toast.success(
          `Berhasil hapus ${successfulDeletions.length} project! 😎`,
          { id: toastId },
        );

        setSelectedProjects([]);
        setSelectMode(false);
      } else if (successfulDeletions.length === 0) {
        // All failed
        toast.error(`Gagal hapus semua project! 😱 Coba lagi nanti ya.`, {
          id: toastId,
        });
      } else {
        // Partial success
        toast.warning(
          `${successfulDeletions.length} project berhasil dihapus, tapi ${failedDeletions.length} gagal. Cek console untuk detail error.`,
          { id: toastId, duration: 6000 },
        );

        // Remove successfully deleted projects from selection
        setSelectedProjects((prev) =>
          prev.filter((id) => !successfulDeletions.includes(id)),
        );
      }

      setIsOpenDelete(false);
    } catch (error) {
      // This catches any unexpected errors (network issues, etc.)
      console.error("Bulk delete error:", error);

      toast.error(
        "Waduh, ada masalah teknis! 😱 Coba refresh page atau coba lagi nanti.",
        { id: toastId },
      );
    }
  }, [
    selectedProjects,
    deleteProjectMutation,
    refetch,
    setSelectedProjects,
    setSelectMode,
  ]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="text-muted-foreground absolute top-3.5 left-4 size-5" />
          <Input placeholder="Search Project" className="w-full !pl-12" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"secondary"} onClick={toggleSelectMode}>
            {selectMode ? (
              <>
                <XIcon />
                Gajadi
              </>
            ) : (
              <>
                <SquareDashedMousePointerIcon />
                Pilih
              </>
            )}
          </Button>

          <Button variant={"secondary"}>
            <ListFilterIcon />
            Filter
          </Button>
        </div>
      </div>

      <div className="auto-fill-72 grid gap-4">
        {isPending ? (
          <LoadingElement />
        ) : error ? (
          <ErrorElement />
        ) : data && data.length > 0 ? (
          data.map((project) => (
            <CardProject
              key={project.id}
              data={project as any}
              checkMode={selectMode}
              checked={isProjectSelected(project.id)}
              onCheckedChange={(v) => handleSelectProject(v, project.id)}
            />
          ))
        ) : (
          <EmptyElement />
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button size={"icon"} variant={"secondary"} disabled>
          <ChevronLeftIcon />
        </Button>

        <div className="relative">
          <input
            type="number"
            defaultValue={1}
            min={1}
            max={10}
            step={1}
            className="bg-input h-9 rounded-md px-2 pr-12 text-center focus:border-0 focus:ring-0 focus:outline-none"
          />

          <div className="text-muted-foreground absolute top-1.5 right-4 block">{`/ 10`}</div>
        </div>

        <Button size={"icon"} variant={"secondary"}>
          <ChevronRightIcon />
        </Button>
      </div>

      <AnimatePresence>
        {selectMode && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            className="fixed inset-x-0 bottom-4 mx-auto w-max max-w-sm"
          >
            <div className="bg-secondary flex items-center gap-2 rounded-full p-2 px-2">
              <Button size={"sm"} variant={"outline"} onClick={toggleSelectAll}>
                <SquareDashedIcon />
                Pilih Semua
              </Button>

              <Button
                size={"sm"}
                variant={"outline"}
                className="text-destructive"
                onClick={() => setIsOpenDelete(true)}
              >
                <TrashIcon />
                {`Hapus ${selectedProjects.length}`}
              </Button>

              <button
                onClick={toggleSelectMode}
                className="text-muted-foreground hover:text-foreground grid size-6 cursor-pointer place-content-center"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DrawerResponsive
        title={"Kamu yakin?"}
        description="Yakin nih mau hapus project ini?"
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
      >
        <div>
          <p className="text-muted-foreground text-sm">
            {`Yakin mau hapus ${selectedProjects.length} project? Aksi ini gak bisa di-undo loh!`}
          </p>
        </div>

        <div
          className={clsx(
            "mt-auto flex items-center gap-2",
            isPendingDelete ? "justify-center" : "justify-end",
          )}
        >
          {isPendingDelete ? (
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
                disabled={isPendingDelete}
              >
                G jadi deng
              </Button>
              <Button
                className="max-sm:w-full max-sm:flex-1"
                onClick={handleDeleteBulkAction}
                disabled={isPendingDelete}
              >
                Y
              </Button>
            </>
          )}
        </div>
      </DrawerResponsive>
    </div>
  );
};

export default ProjectLists;

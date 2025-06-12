import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import CardProject from "./CardProject";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
  LoaderCircleIcon,
  SearchIcon,
  SquareCheckIcon,
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
import { useSearchParams } from "next/navigation";
import { useUrlParams } from "@/hooks/useUrlParams";
import ProjectFilters from "./ProjectFilters";
import { useDebounce, useDebounceValue } from "@/hooks/useDebounce";
import { ProjectQueryOptions } from "@/components/forms/projects/actions";

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

const NotFoundElement = () => {
  return (
    <div className="col-span-full grid min-h-60 place-content-center gap-3 text-center">
      <h2>Gak ketemu.</h2>

      <p>Query yang kamu cari gak ketemu euy.</p>
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
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const searchParams = useSearchParams();
  const { updateParams, deleteParams, getParam } = useUrlParams(searchParams);

  const debounceSearch = useDebounce((v: string) => {
    if (v.length > 0) {
      updateParams("search", v);
    } else {
      deleteParams("search");
    }
  }, 300);

  const debounceInputpage = useDebounce((v: string) => {
    if (v.length > 0) {
      updateParams("page", v);
    } else {
      deleteParams("page");
    }
  }, 300);

  const currentPage = useMemo(() => {
    return getParam("page") || "1";
  }, [updateParams]);

  const searchQuery = useMemo(() => {
    return getParam("search") || undefined;
  }, [updateParams]);

  const filtersParams = useMemo((): ProjectQueryOptions["filters"] => {
    return Object.fromEntries(
      searchParams.entries(),
    ) as ProjectQueryOptions["filters"];
  }, [searchParams]);

  const PAGE_SIZE = 10;

  const {
    project: { data, isPending, error, refetch },
    count: { data: countData },
    deleteProject: {
      mutateAsync: deleteProjectMutation,
      isPending: isPendingDelete,
    },
  } = useProject(userId, {
    page: Number(currentPage) ?? 1,
    pageSize: PAGE_SIZE,
    filters: filtersParams,
    withCount: true,
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
    if (isOpenFilter) {
      setIsOpenFilter(false);
    }

    setSelectMode((prev) => {
      if (prev) {
        setSelectedProjects([]); // Clear selection when exiting select mode
      }
      return !prev;
    });
  }, [isOpenFilter]);

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

  const handleUpdatePage = useCallback(
    (direction: "next" | "prev") => {
      let newPage = currentPage;

      if (direction === "next") {
        newPage = String(Number(currentPage) + 1);

        updateParams("page", newPage);
      } else {
        newPage = String(Number(currentPage) - 1);

        updateParams("page", newPage);
      }

      if (typeof window !== "undefined") {
        const input = document.getElementById("sip") as HTMLInputElement;

        input.value = String(newPage);
      }
    },
    [currentPage],
  );

  const shouldShowOptions = useMemo(() => {
    if (data && data.length > 0) return true;
    else if (data && data.length === 0 && countData && countData.count > 0)
      return true;
    return false;
  }, [data, countData]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between max-sm:gap-4 md:gap-2">
        <div className="relative w-full max-w-sm max-sm:flex-auto">
          <SearchIcon className="text-muted-foreground absolute top-2.5 left-4 size-5 md:top-3.5" />
          <Input
            id="spi"
            defaultValue={searchQuery}
            onChange={(e) => debounceSearch(e.target.value)}
            placeholder="Search Project"
            className="w-full !px-12"
            disabled={!shouldShowOptions}
          />

          {searchQuery && (
            <Button
              size={"icon"}
              variant={"secondary"}
              className="absolute top-0.5 right-1.5 md:top-1.5"
              onClick={() => {
                deleteParams("search");

                if (typeof window !== "undefined") {
                  const input = document.getElementById(
                    "spi",
                  ) as HTMLInputElement;
                  input.value = "";
                }
              }}
            >
              <XIcon />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 max-sm:flex-auto max-sm:justify-between">
          <Button
            variant={"secondary"}
            onClick={toggleSelectMode}
            disabled={!shouldShowOptions}
          >
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

          <Button
            variant={"secondary"}
            onClick={() => {
              setIsOpenFilter(!isOpenFilter);

              if (selectMode) {
                setSelectMode(false);
              }
            }}
            disabled={!shouldShowOptions}
          >
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
        ) : shouldShowOptions ? (
          <NotFoundElement />
        ) : (
          <EmptyElement />
        )}
      </div>

      {data && shouldShowOptions && (
        <>
          {data.length > 0 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={() => handleUpdatePage("prev")}
                disabled={Number(currentPage) === 1}
              >
                <ChevronLeftIcon />
              </Button>
              <div className="relative">
                <input
                  id="sip"
                  type="number"
                  defaultValue={currentPage}
                  onChange={(e) => debounceInputpage(e.target.value)}
                  min={1}
                  max={Math.ceil((countData?.count ?? 0) / PAGE_SIZE)}
                  step={1}
                  disabled={
                    Number(currentPage) >=
                    Math.ceil((countData?.count ?? 0) / PAGE_SIZE)
                  }
                  className="bg-input disabled:text-muted-foreground h-9 rounded-md px-2 pr-12 text-center focus:border-0 focus:ring-0 focus:outline-none disabled:pointer-events-none"
                />
                <div className="text-muted-foreground absolute top-1.5 right-4 block">{`/ ${Math.ceil((countData?.count ?? 0) / PAGE_SIZE)}`}</div>
              </div>
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={() => handleUpdatePage("next")}
                disabled={
                  Number(currentPage) >=
                  Math.ceil((countData?.count ?? 0) / PAGE_SIZE)
                }
              >
                <ChevronRightIcon />
              </Button>
            </div>
          )}

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
                className="dark fixed inset-x-0 bottom-4 z-10 mx-auto w-max max-w-sm"
              >
                <div className="bg-secondary flex items-center gap-2 rounded-full p-2 px-2">
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    className="dark text-zinc-300"
                    onClick={toggleSelectAll}
                  >
                    {selectedProjects.length === data.length ? (
                      <SquareCheckIcon />
                    ) : (
                      <SquareDashedIcon className="" />
                    )}
                    Pilih Semua
                  </Button>

                  <Button
                    size={"sm"}
                    variant={"outline"}
                    className="dark text-destructive"
                    onClick={() => setIsOpenDelete(true)}
                    disabled={!selectedProjects.length} // Tambahkan kondisi untuk men
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

          <ProjectFilters open={isOpenFilter} onOpenChange={setIsOpenFilter} />

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
        </>
      )}
    </div>
  );
};

export default ProjectLists;

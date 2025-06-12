import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublic } from "@/hooks/query/public/usePublic";
import { formatLargeValue } from "@/lib/utils";
import React from "react";

export default function DataInfoSection() {
  const {
    projectCount: { data: countProject, isLoading: isLoadingProject },
    userCount: { data: countUser, isLoading: isLoadingUser },
  } = usePublic();

  const isLoading = isLoadingProject || isLoadingUser; // Assuming both are loading at the same time

  return (
    <section className="container flex items-center justify-center gap-6 md:gap-20">
      <div className="flex items-center gap-4 text-left">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <>
            <h1>{formatLargeValue(countProject?.count ?? 0)}</h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Brief udah <br /> dibuat
            </p>
          </>
        )}
      </div>

      <Separator orientation="vertical" className="!h-20" />

      <div className="flex items-center gap-4 text-left">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <>
            <h1>{formatLargeValue(countUser?.count ?? 0)}</h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Pengangguran <br /> terdaftar
            </p>
          </>
        )}
      </div>
    </section>
  );
}

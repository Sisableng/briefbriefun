"use client";
import { outputSchema } from "@/ai-stuff/output-schema";
import React, { FC, memo, useMemo, useCallback } from "react";
import { z } from "zod";
import Markdown from "react-markdown";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, FilePenIcon, FileXIcon, SaveIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { projectFormSchema, statusSchema } from "./schema";
import { useSession } from "@/hooks/query/auth-hooks";
import { useRouter } from "@bprogress/next/app";
import { useProject } from "@/hooks/query/useProject";

const formSchema = projectFormSchema.omit({
  source: true,
});

interface ProjectReviewProps {
  isLoading: boolean;
  data: {
    form: z.infer<typeof formSchema>;
    object?: z.infer<typeof outputSchema>;
  };
  error?: Error;
}

// Memoized ProjectField component
const ProjectField = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        {children}
      </div>
    );
  },
);

ProjectField.displayName = "ProjectField";

// Memoized Loading component
const LoadingSkeleton = memo(() => (
  <>
    {[...Array(4)].map((_, i) => {
      const widths = ["60%", "75%", "90%", "45%", "85%"];
      return (
        <Skeleton
          key={`skeleton-${i}`}
          className="h-6"
          style={{
            width: widths[Math.floor(Math.random() * widths.length)],
          }}
        />
      );
    })}
  </>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

// Memoized Error component
const ErrorDisplay = memo(({ error }: { error: Error }) => (
  <div className="absolute inset-0 grid place-content-center gap-2 text-center">
    <div className="bg-secondary m-auto mb-4 grid size-14 place-content-center rounded-full">
      <FileXIcon className="text-primary size-8" />
    </div>

    {error.message === "Ratelimited!" ? (
      <>
        <h3>
          Waduh, <br /> kamu ngebut banget nih 😅.
        </h3>
        <p className="text-muted-foreground max-w-lg">
          Coba lagi besok, sebelum bikin brief lagi, ya!
        </p>
      </>
    ) : (
      <>
        <h3>Sori, kayanya Error</h3>
        <p className="text-muted-foreground max-w-lg text-sm">
          {error.message}
        </p>
      </>
    )}
  </div>
));

ErrorDisplay.displayName = "ErrorDisplay";

// Memoized Empty state component
const EmptyState = memo(() => (
  <div className="absolute inset-0 grid place-content-center gap-2 text-center">
    <div className="bg-secondary m-auto mb-4 grid size-14 place-content-center rounded-full">
      <FilePenIcon className="text-primary size-8" />
    </div>
    <h2>Brief-an Dulu, Kerjain Nanti</h2>
    <p className="text-muted-foreground max-w-lg text-sm">
      Pilih tipe project, industri, dan gaya ngomong client-nya. Sisanya?
      Serahin ke AI. Brief akan muncul seperti beneran dapet dari client yang
      super... unik.
    </p>
  </div>
));

EmptyState.displayName = "EmptyState";

// Memoized Content component
const ProjectContent = memo(
  ({
    data,
    onSave,
  }: {
    data: z.infer<typeof outputSchema>;
    onSave: (status: z.infer<typeof statusSchema>) => void;
  }) => {
    const handleDraftSave = useCallback(() => onSave("draft"), [onSave]);
    const handleProgressSave = useCallback(
      () => onSave("inProgress"),
      [onSave],
    );

    return (
      <>
        <div className="flex items-center justify-end gap-2">
          <Button variant={"secondary"} onClick={handleDraftSave}>
            <SaveIcon />
            Masukin ke Draft
          </Button>
          <Button onClick={handleProgressSave}>
            Gas, Kerjain!
            <ArrowRightIcon />
          </Button>
        </div>

        {data.title && (
          <ProjectField title="Title">
            <p>{data.title}</p>
          </ProjectField>
        )}

        {data.description && (
          <ProjectField title="Deskripsi">
            <p>{data.description}</p>
          </ProjectField>
        )}

        {data.clientName && (
          <ProjectField title="Client">
            <p>{data.clientName}</p>
          </ProjectField>
        )}

        {data.deadline && (
          <ProjectField title="Deadline">
            <p>{data.deadline}</p>
          </ProjectField>
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
    );
  },
);

ProjectContent.displayName = "ProjectContent";

const ProjectReview = memo(({ data, isLoading, error }: ProjectReviewProps) => {
  const { user } = useSession();
  const router = useRouter();

  const {
    create: { mutateAsync },
  } = useProject(user?.id);

  const handleSave = useCallback(
    async (status: z.infer<typeof statusSchema>) => {
      if (!user) {
        toast.error("User gak ada! 😭");
        return;
      }

      if (!data || !data.object) {
        toast.error("Gak ada data buat dibikin! 😭");
        return;
      }

      const toastId = toast.loading("Sabar...");
      try {
        await mutateAsync({
          ...data.object,
          ...data.form,
          status,
          userId: user.id,
        });

        toast.success("Berhasil! 😎", {
          id: toastId,
        });

        router.push("/me");
      } catch (error) {
        console.error(error);

        toast.error("Waduh, keknya ada yang salah! 😱", {
          id: toastId,
        });
      }
    },
    [data, user, mutateAsync, router],
  );

  // Render content based on state
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return <ErrorDisplay error={error} />;
    }

    if (data.object) {
      return <ProjectContent data={data.object} onSave={handleSave} />;
    }

    return <EmptyState />;
  };

  return (
    <div className="bg-card relative flex min-h-60 flex-1 flex-col gap-4 rounded-xl p-4 md:p-6">
      {renderContent()}
    </div>
  );
});

ProjectReview.displayName = "ProjectReview";

export default ProjectReview;

"use client";
import { outputSchema } from "@/ai-stuff/output-schema";
import React, { FC } from "react";
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

const ProjectReview = ({ data, isLoading, error }: ProjectReviewProps) => {
  const { user } = useSession();

  const router = useRouter();

  const {
    create: { mutateAsync },
  } = useProject(user?.id);

  const handleSave = async (status: z.infer<typeof statusSchema>) => {
    if (!user) {
      toast.error("User gak ada!");
      return;
    }

    if (!data || !data.object) {
      toast.error("Gak ada data buat dibikin!");
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

      toast.success("Berhasil!", {
        id: toastId,
      });

      router.push("/me");
    } catch (error) {
      console.error(error);

      toast.error("Sori, keknya ada yang salah!", {
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-card relative flex min-h-60 flex-1 flex-col gap-4 rounded-xl p-4 md:p-6">
      {isLoading ? (
        [...Array(4)].map((_, i) => {
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
        })
      ) : error ? (
        <div className="absolute inset-0 grid place-content-center gap-2 text-center">
          <div className="bg-secondary m-auto mb-4 grid size-14 place-content-center rounded-full">
            <FileXIcon className="text-primary size-8" />
          </div>

          <h2>Sori, kayanya Error</h2>
          <p className="text-muted-foreground max-w-lg text-sm">
            {error.message}
          </p>
        </div>
      ) : data.object ? (
        <>
          <div className="flex items-center justify-end gap-2">
            <Button variant={"secondary"} onClick={() => handleSave("draft")}>
              <SaveIcon />
              Masukin ke Draft
            </Button>
            <Button onClick={() => handleSave("inProgress")}>
              Gas, Kerjain!
              <ArrowRightIcon />
            </Button>
          </div>

          {data.object.title && (
            <ProjectField title="Title">
              <p>{data.object.title}</p>
            </ProjectField>
          )}

          {data.object.description && (
            <ProjectField title="Deskripsi">
              <p>{data.object.description}</p>
            </ProjectField>
          )}

          {data.object.clientName && (
            <ProjectField title="Client">
              <p>{data.object.clientName}</p>
            </ProjectField>
          )}

          {data.object.deadline && (
            <ProjectField title="Deadline">
              <p>{data.object.deadline}</p>
            </ProjectField>
          )}

          {data.object.content && (
            <>
              <Separator />

              <div className="prose dark:prose-invert">
                <Markdown>{data.object.content}</Markdown>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="absolute inset-0 grid place-content-center gap-2 text-center">
          <div className="bg-secondary m-auto mb-4 grid size-14 place-content-center rounded-full">
            <FilePenIcon className="text-primary size-8" />
          </div>

          <h2>Brief-an Dulu, Kerjain Nanti</h2>
          <p className="text-muted-foreground max-w-lg text-sm">
            Pilih tipe project, industri, dan gaya ngomong client-nya. Sisanya?
            Serahin ke AI. Brief akan muncul seperti beneran dapet dari client
            yang super... unik.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectReview;

function ProjectField({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{title}</p>
      {children}
    </div>
  );
}

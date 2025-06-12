"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  goodBriefIndustryOptions,
  goodBriefTypeOptions,
  GroupedOption,
  industryOptions,
  typeOptions,
  vibeOptions,
} from "./options";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox";

import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outputSchema } from "@/ai-stuff/output-schema";
import dynamic from "next/dynamic";
import { projectFormSchema } from "./schema";
import { useSession } from "@/hooks/query/auth-hooks";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";

const ProjectReview = dynamic(() => import("../../me/project/ProjectReview"), {
  ssr: false,
  loading: () => (
    <div className="bg-card relative flex min-h-60 flex-1 flex-col gap-4 rounded-xl p-4 md:p-6"></div>
  ),
});

export default function ProjectForm() {
  const [briefData, setBriefData] = React.useState<any>(null);

  const { session } = useSession();

  const mdScreen = useMediaQuery(mq("md"));

  const { object, submit, isLoading, error } = useObject({
    api: "/api/generate-projects",
    schema: outputSchema,
    onError(error) {
      console.log("use-object", error.message);
    },
  });

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      source: "default",
      //   type: "",
      //   industry: "",
      vibe: "corporate",
    },
    disabled: isLoading,
  });

  const watchSource = form.watch("source");

  const isGroupedOptions = (options: any[]): options is GroupedOption[] => {
    return options.length > 0 && "options" in options[0];
  };

  const types = React.useMemo(() => {
    if (watchSource === "goodbrief") {
      return goodBriefTypeOptions;
    }

    return typeOptions;
  }, [watchSource]);

  const industries = React.useMemo(() => {
    if (watchSource === "goodbrief") {
      return goodBriefIndustryOptions;
    }

    return industryOptions;
  }, [watchSource]);

  const vibes = React.useMemo(() => {
    return vibeOptions;
  }, []);

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    if (!session) {
      toast.error("Gak ada sesi ha?, Kamu siapa? 🤨");
      return;
    }

    try {
      if (watchSource === "goodbrief") {
        const toastId = toast.loading("Sabar...");

        const res = await fetch("https://goodbrief.io/brief", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job: values.type,
            industry: values.industry,
          }),
        });

        if (!res.ok) {
          toast.error("Sori, Brief gagal dibikin", {
            id: toastId,
          });

          return;
        }

        const data = await res.json();

        setBriefData(data);
        toast.success("Brief udah dibikinin!", {
          id: toastId,
        });

        return;
      }

      submit(
        JSON.stringify({
          type: values.type,
          industry: values.industry,
          vibe: values.vibe,
          ip: session.ipAddress,
        }),
      );
    } catch (error) {
      console.error(error);
      toast.dismiss();

      toast.error("Waduh, Keknya ada yang salah! 😱");
    }
  }

  const processing = React.useMemo(() => {
    if (process.env.NODE_ENV === "development") {
      return form.formState.isSubmitting;
    }

    return form.formState.isSubmitting || isLoading;
  }, [form.formState.isSubmitting, isLoading]);

  const Fields = () => {
    return (
      <>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="max-sm:sr-only">Tipe</FormLabel>
              <FormControl>
                <Combobox
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    placeholder="Pilih Tipe..."
                    onValueChange={field.onChange}
                  />
                  <ComboboxContent className="dark">
                    <ComboboxEmpty className="text-muted-foreground py-2">
                      {`Kustom "${field.value}"`}
                    </ComboboxEmpty>
                    {isGroupedOptions(types)
                      ? types
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((group) => (
                            <ComboboxGroup
                              key={group.name}
                              className="not-last:mb-4"
                              heading={group.name}
                            >
                              {group.options
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((opt) => (
                                  <ComboboxItem
                                    key={opt.name}
                                    value={opt.value}
                                    // className="text-sm"
                                  >
                                    {opt.name}
                                  </ComboboxItem>
                                ))}
                            </ComboboxGroup>
                          ))
                      : types
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((opt) => (
                            <ComboboxItem
                              key={opt.name}
                              value={opt.value}
                              // className="text-sm"
                            >
                              {opt.name}
                            </ComboboxItem>
                          ))}
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage className="ml-0" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="max-sm:sr-only">Industri</FormLabel>
              <FormControl>
                <Combobox
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ComboboxInput
                    placeholder="Pilih Industri..."
                    onValueChange={field.onChange}
                  />
                  <ComboboxContent className="dark">
                    <ComboboxEmpty className="text-muted-foreground py-2">
                      {`Kustom "${field.value}"`}
                    </ComboboxEmpty>
                    {industries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((opt) => (
                        <ComboboxItem
                          key={opt.name}
                          value={opt.value}
                          // className="text-sm"
                        >
                          {opt.name}
                        </ComboboxItem>
                      ))}
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage className="ml-0" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vibe"
          render={({ field }) => (
            <FormItem className="max-sm:col-span-full">
              <FormLabel className="max-sm:sr-only">Vibe</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent className="dark">
                    {vibes
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((opt) => (
                        <SelectItem
                          key={opt.name}
                          value={opt.value}
                          className="text-sm"
                        >
                          {opt.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="ml-0" />
            </FormItem>
          )}
        />
      </>
    );
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-10 max-sm:border-t max-sm:pt-8 sm:flex-row md:mt-14">
      <Form {...form}>
        {mdScreen ? (
          <>
            <div className="w-full shrink-0 space-y-8 self-start overflow-y-auto p-1 md:sticky md:top-26 md:w-60">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <Fields />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting || isLoading}
                >
                  {form.formState.isSubmitting || isLoading ? (
                    <>
                      Sabar...
                      <LoaderCircleIcon className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Buat
                      <ArrowRightIcon />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-secondary dark fixed inset-x-0 bottom-0 z-10 min-h-20 rounded-t-xl"
          >
            <div className="relative grid grid-cols-2 gap-2 p-4">
              <Fields />

              <Button
                type="submit"
                className="col-span-full w-full"
                disabled={form.formState.isSubmitting || isLoading}
              >
                {form.formState.isSubmitting || isLoading ? (
                  <>
                    Sabar...
                    <LoaderCircleIcon className="animate-spin" />
                  </>
                ) : (
                  <>
                    Buat
                    <ArrowRightIcon />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </Form>

      <ProjectReview
        data={{
          object: object as any,
          form: form.getValues(),
        }}
        isLoading={processing}
        error={error}
      />
    </div>
  );
}

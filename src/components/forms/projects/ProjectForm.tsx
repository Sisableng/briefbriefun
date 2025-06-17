"use client";
import React, { useState } from "react";

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

import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outputSchema } from "@/ai-stuff/output-schema";
import dynamic from "next/dynamic";
import { projectFormSchema } from "./schema";
import { useSession } from "@/hooks/query/auth-hooks";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
} from "@/components/ui/autocomplete";
import { useRemaining } from "@/hooks/query/useRemaining";

const ProjectReview = dynamic(() => import("../../me/project/ProjectReview"), {
  ssr: false,
  loading: () => (
    <div className="bg-card relative flex min-h-60 flex-1 flex-col gap-4 rounded-xl p-4 md:p-6"></div>
  ),
});

export default function ProjectForm() {
  const { session, user } = useSession();

  const mdScreen = useMediaQuery(mq("md"));

  const { data, refetch } = useRemaining(user?.id ?? "");

  const { object, submit, isLoading, error } = useObject({
    api: "/api/generate-projects",
    schema: outputSchema,
    onError(error) {
      console.log("use-object", error.message);
    },
    async onFinish(e) {
      await refetch();
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
    disabled: isLoading || (data && data?.remaining === 0),
  });

  const watchSource = form.watch("source");

  const types = React.useMemo(() => {
    return typeOptions;
  }, []);

  const industries = React.useMemo(() => {
    if (watchSource === "goodbrief") {
      return goodBriefIndustryOptions;
    }

    return industryOptions;
  }, [watchSource]);

  const vibes = React.useMemo(() => {
    return vibeOptions;
  }, []);

  const formatValues = (values: z.infer<typeof projectFormSchema>) => {
    const typeValue = types
      .flatMap((x) => x.options)
      .find((t) => t.name === values.type)?.value;

    const industryType = industries.find(
      (t) => t.name === values.industry,
    )?.value;

    const formatted = {
      vibe: values.vibe,
      type: typeValue ?? values.type,
      industry: industryType ?? values.industry,
    };
    return formatted;
  };

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    if (!session || !user) {
      toast.error("Gak ada sesi ha?, Kamu siapa? 🤨");
      return;
    }

    try {
      const formatted = formatValues(values);

      submit(
        JSON.stringify({
          ...formatted,
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
    // if () {
    // }

    return form.formState.isSubmitting;
    // return form.formState.isSubmitting || isLoading;
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
                <Autocomplete
                  {...field}
                  value={field.value}
                  onChange={(i) => {
                    field.onChange(i);
                  }}
                  onSelect={(i) => {
                    if (i) {
                      field.onChange(i.label);
                      // form.setValue("autoCompleteType.select", i?.value);
                    }
                  }}
                  placeholder="Tipe"
                  className="w-full"
                >
                  <AutocompleteContent>
                    {types
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((group) => (
                        <AutocompleteGroup
                          key={group.name}
                          className="not-last:mb-4"
                          label={group.name}
                        >
                          {group.options
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((opt) => (
                              <AutocompleteItem
                                key={opt.name}
                                value={opt.value}
                                // className="text-sm"
                              >
                                {opt.name}
                              </AutocompleteItem>
                            ))}
                        </AutocompleteGroup>
                      ))}
                  </AutocompleteContent>
                </Autocomplete>
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
                <Autocomplete
                  {...field}
                  value={field.value}
                  onChange={(i) => {
                    field.onChange(i);
                  }}
                  onSelect={(i) => {
                    if (i) {
                      field.onChange(i.label);
                    }
                  }}
                  placeholder="Industri"
                  className="w-full"
                >
                  <AutocompleteContent>
                    {industries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((opt) => (
                        <AutocompleteItem
                          key={opt.name}
                          value={opt.value}
                          // className="text-sm"
                        >
                          {opt.name}
                        </AutocompleteItem>
                      ))}
                  </AutocompleteContent>
                </Autocomplete>
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
    <div className="flex flex-1 flex-col gap-4">
      {data && (
        <div className="text-primary flex w-max items-center gap-2 font-semibold">
          <p>Sisa Nyawa:</p>
          <p>{data?.remaining}</p>
        </div>
      )}

      <div className="flex size-full flex-1 flex-col gap-10 border-t pt-8 sm:flex-row">
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
                    disabled={
                      form.formState.isSubmitting ||
                      isLoading ||
                      (data && data?.remaining === 0)
                    }
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
                  disabled={
                    form.formState.isSubmitting ||
                    isLoading ||
                    (data && data?.remaining === 0)
                  }
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
            form: formatValues(form.getValues()),
          }}
          isLoading={processing}
          error={error}
          isRateLimited={data && data?.remaining === 0}
        />
      </div>
    </div>
  );
}

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outputSchema } from "@/ai-stuff/output-schema";
import dynamic from "next/dynamic";
import { projectFormSchema } from "./schema";

const ProjectReview = dynamic(() => import("./ProjectReview"), {
  ssr: false,
  loading: () => (
    <div className="bg-card relative flex min-h-60 flex-1 flex-col gap-4 rounded-xl p-4 md:p-6"></div>
  ),
});

export default function ProjectForm() {
  const [briefData, setBriefData] = React.useState<any>(null);

  const { object, submit, isLoading, stop, error } = useObject({
    api: "/api/generate-projects",
    schema: outputSchema,
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
        }),
      );
    } catch (error) {
      console.error(error);
      toast.dismiss();

      toast.error("Sori, Keknya ada yang salah bro!");
    }
  }
  return (
    <div className="mt-14 flex size-full flex-1 flex-col gap-10 sm:flex-row">
      <div className="sticky top-20 shrink-0 space-y-8 self-start overflow-y-auto p-1 md:top-26 md:w-60">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-0">Source</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="default" />
                        </FormControl>
                        <FormLabel className="mb-0 ml-0 font-normal">
                          Default
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="goodbrief" />
                        </FormControl>
                        <FormLabel className="mb-0 ml-0 font-normal">
                          Good Brief
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="ml-0" />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {isGroupedOptions(types)
                          ? types
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((group) => (
                                <SelectGroup
                                  key={group.name}
                                  className="not-last:mb-4"
                                >
                                  <SelectLabel>{group.name}</SelectLabel>
                                  {group.options
                                    .sort((a, b) =>
                                      a.name.localeCompare(b.name),
                                    )
                                    .map((opt) => (
                                      <SelectItem
                                        key={opt.name}
                                        value={opt.value}
                                        className="text-sm"
                                      >
                                        {opt.name}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              ))
                          : types
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

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industri</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries
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

            <FormField
              control={form.control}
              name="vibe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vibe</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
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
        </Form>
      </div>

      <ProjectReview
        data={{
          object: object as any,
          form: form.getValues(),
        }}
        isLoading={form.formState.isSubmitting}
        error={error}
      />
    </div>
  );
}

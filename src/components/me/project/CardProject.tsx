"use client";
import React, { FC, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { Project } from "@/components/forms/projects/schema";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useSearchParams } from "next/navigation";
import {
  industryOptions,
  typeOptions,
} from "@/components/forms/projects/options";

interface CardProjectProps {
  data: Project;
  className?: string;
  checkMode?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const CardProject = ({
  data,
  className,
  checkMode,
  checked,
  onCheckedChange,
}: CardProjectProps) => {
  const searchParams = useSearchParams();
  const { updateParams, deleteParams, getParam, hasParam } =
    useUrlParams(searchParams);

  const typeName = useMemo(() => {
    const all = typeOptions
      .flatMap((x) => x.options)
      .find((x) => x.value === data.type);

    return all?.name || "Unknown";
  }, [data.type]);

  const industryName = useMemo(() => {
    const all = industryOptions.find((x) => x.value === data.industry);

    return all?.name || "Unknown";
  }, [data.type]);

  const handleCardClick = () => {
    if (checkMode && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const toggleParam = useCallback(
    (key: string, value: string) => {
      const exists = hasParam(key);

      if (exists) {
        deleteParams(key);
      } else {
        updateParams(key, value);
      }
    },
    [updateParams],
  );

  return (
    <Card
      className={cn(
        "",

        checkMode && "ring-border cursor-pointer ring hover:opacity-50",

        checked ? "ring-primary ring-2" : "",
        className,
      )}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 border-b pb-4">
          <Badge
            variant={getParam("type") === data.type ? "default" : "secondary"}
            className="cursor-pointer capitalize"
            onClick={() => toggleParam("type", data.type)}
          >
            {typeName}
          </Badge>
          <Badge
            variant={
              getParam("industry") === data.industry ? "default" : "secondary"
            }
            className="cursor-pointer capitalize"
            onClick={() => toggleParam("industry", data.industry)}
          >
            {industryName}
          </Badge>
        </div>

        <CardTitle className={clsx(checkMode && "pointer-events-none")}>
          <Link
            href={`/me/projects/${data.id}`}
            className="hover:text-primary transition-colors ease-in-out"
          >
            {data.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={clsx(checkMode && "pointer-events-none")}>
          <p className="text-sm">Deadline</p>
          <p className="text-muted-foreground text-sm">{data.deadline}</p>
        </div>
      </CardContent>
      <CardFooter
        className={clsx(
          "justify-between gap-2",
          checkMode && "pointer-events-none",
        )}
      >
        <StatusBadge
          status={data.status}
          onClick={() => toggleParam("status", data.status)}
        />

        <Button size={"icon"} variant={"outline"} className="ml-auto" asChild>
          <Link href={`/me/projects/${data.id}`}>
            <ArrowUpRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProject;

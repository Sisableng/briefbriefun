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
import { getIndustryName, getTypeName } from "@/lib/getCategoryName";

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
        "transition-all ease-in-out",

        checkMode &&
          "ring-border ring-offset-background cursor-pointer opacity-40 ring-2 ring-offset-2 hover:opacity-100",

        checked ? "ring-primary opacity-100 ring-2" : "",
        className,
      )}
      onClick={handleCardClick}
    >
      <CardHeader className={clsx(checkMode && "pointer-events-none")}>
        <div className="flex items-center gap-2 overflow-x-auto border-b pb-4">
          <Badge
            variant={getParam("type") === data.type ? "default" : "secondary"}
            className="hover:bg-input hover:text-foreground cursor-pointer truncate capitalize"
            onClick={() => toggleParam("type", data.type)}
          >
            <span>{getTypeName(data.type)}</span>
          </Badge>
          <Badge
            variant={
              getParam("industry") === data.industry ? "default" : "secondary"
            }
            className="hover:bg-input hover:text-foreground cursor-pointer capitalize"
            onClick={() => toggleParam("industry", data.industry)}
          >
            {getIndustryName(data.industry)}
          </Badge>
        </div>

        <CardTitle className={clsx("mt-1", checkMode && "pointer-events-none")}>
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
      <CardContent className="mt-auto">
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
          className="hover:bg-border hover:text-foreground cursor-pointer"
        />

        <Button
          size={"icon"}
          variant={"outline"}
          className="dark:hover:bg-primary hover:bg-primary hover:border-primary hover:text-primary-foreground ml-auto"
          asChild
        >
          <Link href={`/me/projects/${data.id}`}>
            <ArrowUpRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProject;

"use client";
import React, { FC } from "react";
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
  const handleCardClick = () => {
    if (checkMode && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

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
          <Badge variant={"secondary"} className="capitalize">
            {data.type.replace("-", " ")}
          </Badge>
          <Badge variant={"secondary"} className="capitalize">
            {data.industry.replace("-", " ")}
          </Badge>
        </div>

        <CardTitle>{data.title}</CardTitle>
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
        <StatusBadge status={data.status} />

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

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
import { getStatus } from "@/lib/utils";

interface CardProjectProps {
  data: Project;
  className?: string;
}

const CardProject = ({ data, className }: CardProjectProps) => {
  return (
    <Card className={className}>
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
        <div className="">
          <p className="text-muted-foreground text-sm">Deadline</p>
          <p className="text-sm">{data.deadline}</p>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Badge
          variant={
            data.status === "draft"
              ? "outline"
              : data.status === "inProgress"
                ? "secondary"
                : "default"
          }
          className="capitalize"
        >
          {getStatus(data.status)}
        </Badge>

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

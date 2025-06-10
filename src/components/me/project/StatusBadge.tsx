import { ProjectStatus } from "@/components/forms/projects/schema";
import { Badge } from "@/components/ui/badge";
import { cn, getStatus } from "@/lib/utils";
import React, { FC } from "react";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant={
        status === "draft"
          ? "outline"
          : status === "inProgress"
            ? "secondary"
            : "default"
      }
      className={cn("", className)}
    >
      {getStatus(status)}
    </Badge>
  );
};

export default StatusBadge;

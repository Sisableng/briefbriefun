import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatLargeValue, getUserInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UserLeaderBoardProps {
  data: any;
  placement: "first" | "second" | "third";
}

const UserLeaderBoard = ({ data, placement }: UserLeaderBoardProps) => {
  return (
    <div
      className={cn(
        "flex w-40 shrink-0 flex-col items-center gap-4",
        placement === "first" &&
          "max-sm:order-first max-sm:w-full max-sm:flex-auto",
      )}
    >
      <Avatar
        className={cn(
          "bg-secondary",
          placement === "first"
            ? "size-28 shadow-lg ring-4 shadow-yellow-500 ring-yellow-500/30"
            : "size-20",
        )}
      >
        <AvatarImage src={data?.image || "https://github.com/shadcn.png"} />
        <AvatarFallback>{getUserInitials(data?.name)}</AvatarFallback>
      </Avatar>

      <div className="">
        <p className={cn("max-w-40 truncate text-lg font-semibold")}>
          {data?.name || "No User"}
        </p>

        <Badge
          variant={placement === "first" ? "default" : "secondary"}
          className={cn(
            "dark",
            placement === "first" && "bg-yellow-400 text-sm font-semibold",
          )}
        >
          {formatLargeValue(data?.projectCount || 0)} Project
        </Badge>
      </div>
    </div>
  );
};

export default UserLeaderBoard;

import Tip from "@/components/Tip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface UserAvatarProps {
  fallback: string;
  src?: string;
  className?: string;
}

const UserAvatar = ({ src, fallback, className }: UserAvatarProps) => {
  return (
    <div className="group relative">
      <Avatar className={cn("size-9 border", className)}>
        <AvatarImage draggable={false} src={src} />
        <AvatarFallback>{fallback[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <Tip className="inset-x-0 -top-12 mx-auto min-h-max min-w-max text-xs">
        Drag me
      </Tip>
    </div>
  );
};

export default UserAvatar;

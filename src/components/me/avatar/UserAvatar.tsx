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
    <Avatar className={cn("bg-secondary size-9 border", className)}>
      <AvatarImage
        draggable={false}
        src={src}
        className="size-full object-cover"
      />
      <AvatarFallback>{fallback[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

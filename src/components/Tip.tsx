import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface TipProps extends React.PropsWithChildren {
  className?: string;
}

const Tip = ({ children, className }: TipProps) => {
  return (
    <div
      className={cn(
        "bg-primary after:bg-primary text-primary-foreground min-h-10 w-max min-w-10 rounded-full p-2 px-4 after:absolute after:inset-x-0 after:-bottom-0.5 after:mx-auto after:block after:size-3 after:rotate-45 after:content-['']",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

export default Tip;

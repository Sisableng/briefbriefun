import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface TipProps extends React.PropsWithChildren {
  className?: string;
}

const Tip = ({ children, className }: TipProps) => {
  return (
    <div
      className={cn(
        "bg-primary after:bg-primary text-primary-foreground group-hover:animate-in group-hover:zoom-in absolute min-h-10 w-max min-w-10 rounded-full p-2 px-4 opacity-0 transition-all ease-in-out group-hover:opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:mx-auto after:block after:size-3 after:rotate-45 after:content-['']",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Tip;

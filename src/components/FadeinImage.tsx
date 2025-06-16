import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";
import { Skeleton } from "./ui/skeleton";

interface FadeinImageProps extends React.ComponentProps<typeof Image> {
  imageClassName?: string;
}

const FadeinImage = ({
  className,
  imageClassName,
  ...props
}: FadeinImageProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={cn("group relative", className)} data-loaded={isLoaded}>
      <Image
        {...props}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
        className={cn(
          "size-full object-cover opacity-0 transition-opacity ease-in-out group-data-[loaded=true]:opacity-100",
          imageClassName,
        )}
      />

      <p>wew</p>

      <div className="animate-in fade-in absolute inset-0 size-full opacity-100 transition-opacity ease-in-out group-data-[loaded=true]:opacity-0">
        <Skeleton className="size-full" />
      </div>
    </div>
  );
};

export default FadeinImage;

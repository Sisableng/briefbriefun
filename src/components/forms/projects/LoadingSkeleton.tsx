import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const LoadingSkeleton = memo(() => (
  <>
    {[...Array(4)].map((_, i) => {
      const widths = ["60%", "75%", "90%", "45%", "85%"];
      return (
        <Skeleton
          key={`skeleton-${i}`}
          className="h-6"
          style={{
            width: widths[Math.floor(Math.random() * widths.length)],
          }}
        />
      );
    })}
  </>
));

LoadingSkeleton.displayName = "LoadingSkeleton";
export default LoadingSkeleton;

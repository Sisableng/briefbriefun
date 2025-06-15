// Robot.tsx
"use client";
import React, { useRef, forwardRef, Suspense } from "react";
import { cn } from "@/lib/utils";
// import Tip from "@/components/Tip";
// import { LoaderCircleIcon } from "lucide-react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

interface RobotProps {
  className?: string;
  onLoaded?: (loaded: boolean) => void;
}

export interface RobotRef {
  triggerMouseEvent: (
    eventType: string,
    coordinates?: { x: number; y: number },
  ) => void;
}

const Robot = forwardRef<RobotRef, RobotProps>(
  ({ className, onLoaded }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={containerRef}
        className={cn(
          "group relative size-full mask-b-from-20% mask-b-to-100%",
          className,
        )}
      >
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            onLoad={(spline) => {
              if (spline.controls !== undefined) {
                onLoaded?.(true);
              }
            }}
          />
        </Suspense>

        {/* <Tip className="inset-x-0 top-[5%] mx-auto">Ha?</Tip> */}
      </div>
    );
  },
);

Robot.displayName = "Robot";
export default Robot;

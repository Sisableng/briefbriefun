// Robot.tsx
"use client";
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Tip from "@/components/Tip";
import { Application } from "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-60 place-content-center">
      <LoaderCircleIcon className="text-muted-foreground size-6 animate-spin" />
    </div>
  ),
});

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
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          onLoad={(spline) => {
            if (spline.controls !== undefined) {
              onLoaded?.(true);
            }
          }}
        />

        <Tip className="group-hover:animate-in group-hover:zoom-in absolute inset-x-0 top-[5%] mx-auto opacity-0 transition-all ease-in-out group-hover:opacity-100">
          Hello!
        </Tip>
      </div>
    );
  },
);

Robot.displayName = "Robot";
export default Robot;

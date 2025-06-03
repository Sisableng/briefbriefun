// Robot.tsx
"use client";
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Tip from "@/components/Tip";

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
}

export interface RobotRef {
  triggerMouseEvent: (
    eventType: string,
    coordinates?: { x: number; y: number },
  ) => void;
}

const Robot = forwardRef<RobotRef, RobotProps>(({ className }, ref) => {
  const splineRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    triggerMouseEvent: (eventType: string, coordinates) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        clientX: coordinates?.x || rect.left + rect.width / 2,
        clientY: coordinates?.y || rect.top + rect.height / 2,
      });

      containerRef.current.dispatchEvent(event);
    },
  }));

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative size-full mask-b-from-20% mask-b-to-100%",
        className,
      )}
    >
      <Spline
        ref={splineRef}
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
      />

      <Tip className="group-hover:animate-in group-hover:zoom-in absolute inset-x-0 top-[5%] mx-auto opacity-0 transition-all ease-in-out group-hover:opacity-100">
        Hello!
      </Tip>
    </div>
  );
});

Robot.displayName = "Robot";
export default Robot;

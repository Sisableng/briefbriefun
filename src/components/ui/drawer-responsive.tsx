import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import clsx from "clsx";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

interface DrawerResponsiveProps {
  children: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
  description?: string;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  showHeader?: boolean;
  className?: string;
}

export default function DrawerResponsive({
  children,
  trigger,
  title,
  description,
  open,
  onOpenChange,
  showHeader = true,
  className,
}: DrawerResponsiveProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent
          className={cn(
            "dark:bg-popover bg-white focus:outline-none",
            className,
          )}
        >
          <DrawerHeader
            className={clsx("text-left", showHeader ? "" : "sr-only")}
          >
            <DrawerTitle className="border-0 text-lg">{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>

          <div
            className={clsx(
              "flex min-h-40 flex-col overflow-y-auto px-4",
              showHeader ? "mb-6" : "my-6",
            )}
          >
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Suspense fallback={null}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          className={cn(
            "dark:bg-popover flex flex-col overflow-hidden bg-white focus:outline-none",
            className,
          )}
        >
          <DialogHeader className={clsx(title ? "" : "sr-only")}>
            <DialogTitle className={clsx("pb-4", title ? "" : "sr-only")}>
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription className="-mt-4">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="flex flex-grow flex-col overflow-auto">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}

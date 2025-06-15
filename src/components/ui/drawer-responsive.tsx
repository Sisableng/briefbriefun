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
  classNameContent?: string;
  headerContent?: React.ReactNode;
  disableClickOutside?: boolean;
  dismissible?: boolean;
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
  classNameContent,
  headerContent,
  disableClickOutside,
  dismissible = true,
}: DrawerResponsiveProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Drawer dismissible={dismissible} open={open} onOpenChange={onOpenChange}>
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

            {headerContent}
          </DrawerHeader>

          <div
            className={cn(
              "flex min-h-40 flex-col overflow-y-auto px-4",
              showHeader ? "mb-6" : "my-6",
              classNameContent,
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
          onInteractOutside={(e) =>
            disableClickOutside ? e.preventDefault() : undefined
          }
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

            {headerContent}
          </DialogHeader>

          <div
            className={cn(
              "flex min-h-28 flex-grow flex-col overflow-auto",
              classNameContent,
            )}
          >
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}

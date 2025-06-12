"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FloatingAddBriefBtn() {
  const pathname = usePathname();

  if (pathname !== "/me") return null;
  return (
    <Button
      size={"icon"}
      className={cn(
        "dark fixed flex !size-12 w-max md:right-8 md:bottom-8 md:hidden",
        pathname.startsWith("/me/projects")
          ? "bg-secondary text-foreground right-4 bottom-20"
          : "inset-x-0 bottom-5 mx-auto",
      )}
      asChild
    >
      <Link href={"/me/create-brief"}>
        <PlusIcon />
      </Link>
    </Button>
  );
}

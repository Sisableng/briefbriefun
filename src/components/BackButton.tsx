"use client";
import { useRouter } from "@bprogress/next/app";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => router.back()}
      className={cn("", className)}
    >
      <ChevronLeftIcon />
      <span className="sr-only">Balik</span>
    </Button>
  );
}

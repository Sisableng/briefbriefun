"use client";
import { useRouter } from "@bprogress/next/app";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  showText?: boolean;
  className?: string;
}

export default function BackButton({ showText, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={() => router.back()}
      className={cn("w-max", className)}
    >
      <ChevronLeftIcon />
      <span className="">Balik</span>
    </Button>
  );
}

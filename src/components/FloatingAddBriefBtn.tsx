"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FloatingAddBriefBtn() {
  const pathname = usePathname();

  if (pathname === "/me/create-brief") return null;
  return (
    <Button
      size={"icon"}
      className="fixed inset-x-0 bottom-5 mx-auto flex !size-12 w-max md:right-8 md:bottom-8 md:hidden"
      asChild
    >
      <Link href={"/me/create-brief"}>
        <PlusIcon />
      </Link>
    </Button>
  );
}

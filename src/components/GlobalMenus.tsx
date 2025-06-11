"use client";
import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { globalMenus } from "@/other-stuff/information";

export default function GlobalMenus() {
  const pathname = usePathname();

  const mdScreen = useMediaQuery(mq("md"));

  if (!mdScreen) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="mx-auto font-semibold">
            Menu <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark">
          {!pathname.includes("/me") && (
            <>
              <DropdownMenuItem
                variant="default"
                className="bg-primary text-primary-foreground"
                asChild
              >
                <Link href={"/me"}>Ke Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {globalMenus.map((m) => (
            <DropdownMenuItem key={m.label} asChild>
              <Link href={m.href}>{m.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {globalMenus.map((m) => (
        <Button
          key={m.label}
          size={"sm"}
          variant={pathname === m.href ? "default" : "ghost"}
          className="font-semibold"
          asChild
        >
          <Link href={m.href}>{m.label}</Link>
        </Button>
      ))}
    </div>
  );
}

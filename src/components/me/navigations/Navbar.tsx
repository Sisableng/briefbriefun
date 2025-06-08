"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "@bprogress/next/app";
import { usePathname } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOutIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/query/auth-hooks";
import UserAvatar from "../avatar/UserAvatar";
import useWindowScroll from "@/hooks/useWindowScroll";
import clsx from "clsx";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useSession();

  const { isScrolled } = useWindowScroll();

  const { setTheme, resolvedTheme } = useTheme();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  if (pathname === "/me/after-oauth") return null;

  return (
    <div
      className={clsx(
        "sticky inset-x-0 top-0 z-50 mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 backdrop-blur transition-all ease-in-out md:h-20",
        isScrolled ? "bg-background/10" : "",
      )}
    >
      <div className="flex items-center gap-10">
        <Link
          href={"/me"}
          className="hover:text-primary group transition-colors ease-in-out"
        >
          <h3>
            <SiteName />
          </h3>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {pathname !== "/me/create-brief" && (
          <Button className="font-semibold" asChild>
            <Link href={"/me/create-brief"}>
              <PlusIcon />
              Tambah Brief
            </Link>
          </Button>
        )}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3">
              <UserAvatar
                src={user.image ?? undefined}
                fallback={user.name}
                className="flex-1"
              />

              <div className="hidden max-w-30 text-left md:block">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark">
              <DropdownMenuItem asChild>
                <Link href={"/me/profile"}>
                  <UserIcon />
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                }}
              >
                {resolvedTheme === "light" ? (
                  <>
                    <MoonIcon />
                    Dark
                  </>
                ) : (
                  <>
                    <SunIcon />
                    Light
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={signOut}>
                <LogOutIcon />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

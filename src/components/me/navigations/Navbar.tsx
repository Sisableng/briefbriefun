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
import { useIsClient } from "@/hooks/useIsClient";
import GlobalMenus from "@/components/GlobalMenus";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useSession();

  const { isScrolled } = useWindowScroll();
  const isClient = useIsClient();
  const mdScreen = useMediaQuery(mq("md"));

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

  if (!isClient || pathname === "/me/after-oauth") return null;

  return (
    <div
      className={clsx(
        "sticky inset-x-0 top-0 z-50 mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 backdrop-blur transition-all ease-in-out md:h-20",
        isScrolled ? "bg-background/50" : "",
      )}
    >
      <div className="flex items-center gap-10 max-sm:flex-1">
        <Link
          href={"/me"}
          className="hover:text-primary group transition-colors ease-in-out"
        >
          <h3>
            <span className="hidden sm:block">
              <SiteName />
            </span>

            <span className="block sm:hidden">
              B<span className="text-primary text-3xl font-extrabold">2</span>f
            </span>
          </h3>
        </Link>

        <GlobalMenus />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {mdScreen && pathname !== "/me/create-brief" && (
          <Button
            size={"default"}
            variant={"secondary"}
            className="font-semibold"
            asChild
          >
            <Link href={"/me/create-brief"}>
              <PlusIcon />
              <span className="max-sm:sr-only">Tambah Brief</span>
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

"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "@bprogress/next/app";
import { usePathname } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BoltIcon, LogOutIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/query/auth-hooks";
import UserAvatar from "../avatar/UserAvatar";
import useWindowScroll from "@/hooks/useWindowScroll";
import clsx from "clsx";
import { useIsClient } from "@/hooks/useIsClient";
import GlobalMenus from "@/components/GlobalMenus";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";
import { ThemeButton } from "@/components/ThemeButton";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, refetch } = useSession();

  const { isScrolled } = useWindowScroll();
  const isClient = useIsClient();
  const mdScreen = useMediaQuery(mq("md"));

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await refetch();

          router.push("/sign-in");
        },
      },
    });
  }

  if (!isClient || pathname === "/me/after-oauth") return null;

  return (
    <div
      className={clsx(
        "sticky inset-x-0 top-0 z-50 max-w-screen overflow-hidden p-2 transition-all ease-in-out md:px-4 md:backdrop-blur",
        isScrolled ? "md:bg-background/50" : "",
      )}
    >
      <div className="max-sm:bg-secondary/50 mx-auto flex w-full shrink-0 items-center justify-between gap-4 max-sm:rounded-full max-sm:p-2 max-sm:backdrop-blur max-sm:not-dark:border md:h-16 md:max-w-[90rem]">
        <div className="flex items-center gap-10 max-sm:flex-1 max-sm:pl-2">
          <h3 className="leading-none max-sm:mb-1">
            <Link
              href={"/me"}
              className="hover:text-primary group transition-colors ease-in-out"
            >
              <span className="hidden font-bold sm:block">
                <SiteName />
              </span>

              <span className="block sm:hidden">
                B<span className="text-primary text-3xl font-extrabold">2</span>
                f
              </span>
            </Link>
          </h3>

          <GlobalMenus />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {mdScreen && pathname !== "/me/create-brief" && (
            <Button
              size={"default"}
              variant={"default"}
              className="font-semibold"
              asChild
            >
              <Link href={"/me/create-brief"}>
                <PlusIcon />
                <span className="max-sm:sr-only">Tambah Brief</span>
              </Link>
            </Button>
          )}

          <ThemeButton />

          {user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3">
                  <UserAvatar
                    src={user.image ?? undefined}
                    fallback={user.name}
                    className="flex-1 sm:size-10"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark">
                  <DropdownMenuLabel>
                    <p className="truncate font-semibold max-sm:text-sm">
                      {user.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={"/me/profile"}>
                      <UserIcon />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={{
                        pathname: "/me/profile",
                        query: {
                          tab: "account",
                        },
                      }}
                    >
                      <BoltIcon />
                      Akun
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={signOut}>
                    <LogOutIcon />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "@bprogress/next/app";
import { usePathname } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/query/auth-hooks";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useSession();

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
    <div className="sticky inset-x-0 top-0 mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 md:h-20">
      <div className="flex items-center gap-10">
        <Link
          href={"/me"}
          className="hover:text-primary group transition-colors ease-in-out"
        >
          <h3>
            <SiteName />
          </h3>
        </Link>

        {/* <div className="flex items-center gap-4">
          <Button variant={"outline"} asChild>
            <Link href={"#"}>Proyek</Link>
          </Button>
        </div> */}
      </div>

      <div className="flex items-center gap-4">
        <Button className="font-semibold">
          <PlusIcon />
          Buat Brief
        </Button>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3">
              <Avatar className="size-9 flex-1">
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="max-w-30 text-left">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={"/me/profile"}>
                  <UserIcon />
                  Profil
                </Link>
              </DropdownMenuItem>
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

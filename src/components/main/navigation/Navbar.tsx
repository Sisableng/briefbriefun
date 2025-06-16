"use client";

import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/query/auth-hooks";
import useWindowScroll from "@/hooks/useWindowScroll";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { mq, useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import getFirstName from "@/lib/getFirstName";
import { Skeleton } from "@/components/ui/skeleton";

const GlobalMenus = dynamic(() => import("@/components/GlobalMenus"), {
  ssr: false,
});
const ThemeButton = dynamic(
  () => import("@/components/ThemeButton").then((x) => x.ThemeButton),
  {
    ssr: false,
  },
);

export default function Navbar() {
  const { session, user, isLoading } = useSession();
  const { isScrolled } = useWindowScroll();

  const pathname = usePathname();
  const mdScreen = useMediaQuery(mq("md"));

  const authPages = ["/sign-in", "/sign-up"];
  const isAuthPage = authPages.includes(pathname);
  return (
    <div
      className={clsx(
        "sticky inset-x-0 top-0 z-50 max-sm:p-2 md:backdrop-blur",
        isScrolled ? "md:bg-background/50" : "",
      )}
    >
      <div className="max-sm:bg-secondary/50 container flex items-center justify-between gap-4 max-sm:rounded-full max-sm:p-2 max-sm:backdrop-blur md:h-20">
        <div className="mr-auto flex items-center gap-10 max-sm:flex-1 max-sm:pl-2">
          <h3 className="leading-none max-sm:mb-1">
            <Link
              href={"/"}
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

        {mdScreen &&
          (isLoading ? (
            <Skeleton className="h-9 w-20 rounded-full" />
          ) : session ? (
            !pathname.includes("/me") && (
              <Button variant={"secondary"} className="font-semibold" asChild>
                <Link href={"/me"}>
                  {getFirstName(user?.name)} <ArrowRightIcon />
                </Link>
              </Button>
            )
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-2">
                <Button variant={"secondary"} className="font-semibold" asChild>
                  <Link href={"/sign-in"}>
                    Cobain <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            )
          ))}
        <ThemeButton />
      </div>
    </div>
  );
}

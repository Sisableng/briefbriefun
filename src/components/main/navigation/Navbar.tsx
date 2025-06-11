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
  const { session } = useSession();
  const { isScrolled } = useWindowScroll();

  const mdScreen = useMediaQuery(mq("md"));

  return (
    <div
      className={clsx(
        "sticky inset-x-0 top-0 z-50 backdrop-blur",
        isScrolled ? "bg-background/50" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="mr-auto flex items-center gap-10 max-sm:flex-1">
          <Link
            href={"/"}
            className="hover:text-primary group transition-colors ease-in-out"
          >
            <h3>
              <span className="hidden sm:block">
                <SiteName />
              </span>

              <span className="block sm:hidden">
                B<span className="text-primary text-3xl font-extrabold">2</span>
                f
              </span>
            </h3>
          </Link>

          <GlobalMenus />
        </div>

        {mdScreen &&
          (session ? (
            <Button variant={"secondary"} className="font-semibold" asChild>
              <Link href={"/me"}>
                Ke Dashboard <ArrowRightIcon />
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant={"secondary"} className="font-semibold" asChild>
                <Link href={"/sign-in"}>
                  Cobain <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          ))}
        <ThemeButton />
      </div>
    </div>
  );
}

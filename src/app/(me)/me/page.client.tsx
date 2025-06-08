"use client";

import CardProject from "@/components/me/project/CardProject";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/query/auth-hooks";
import { useProject } from "@/hooks/query/useProject";
import getFirstName from "@/lib/getFirstName";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MeHomePage() {
  const { user } = useSession();

  const {
    project: { data, isPending, error },
  } = useProject(user?.id, {
    pageSize: 10,
  });

  return (
    <div className="cme-content space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-sm space-y-2">
          <h2 className="text-muted-foreground">Wassup 👋</h2>
          <h1 className="">{getFirstName(user?.name)}.</h1>
        </div>

        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("id", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="auto-fill-72 grid gap-4">
        {isPending ? (
          [...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-60" />
          ))
        ) : error ? (
          <div className="text-muted-foreground col-span-full grid min-h-60 place-content-center gap-4 text-center">
            <h2>Yah :(</h2>
            <p>Datanya lagi ngambek. Coba lagi nanti ya!</p>
          </div>
        ) : data && data.length > 0 ? (
          data.map((project) => (
            <CardProject key={project.id} data={project as any} />
          ))
        ) : (
          <div className="col-span-full grid min-h-60 place-content-center gap-4 text-center">
            <h2>Masih Kosong nih.</h2>

            <Button className="mx-auto w-max" asChild>
              <Link href={"/me/create-brief"}>
                Yuk mulai bikin Brief!
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import SiteName from "@/components/SiteName";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { globalMenus } from "@/other-stuff/information";
import { HandCoinsIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="container mt-auto flex min-h-32 flex-col justify-center gap-8 pb-10">
      <h1 className="text-center opacity-10">
        <SiteName />
      </h1>

      <div className="flex flex-col items-center justify-between gap-6 text-center text-sm">
        <div className="flex flex-wrap items-center gap-4">
          {globalMenus.map((m, i) => (
            <React.Fragment key={m.label}>
              <p>
                <Link href={m.href}>{m.label}</Link>
              </p>

              {i !== globalMenus.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="!h-4 w-px flex-1 shrink-0"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-muted-foreground">{`Copyright © ${new Date().getFullYear()} Sisableng. All rights reserved.`}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <Button size={"icon"} variant={"secondary"} asChild>
          <Link href={"https://github.com/Sisableng"} target="_blank">
            <SocialIcon name="github" />
          </Link>
        </Button>
        <Button size={"icon"} variant={"secondary"}>
          <Link href={"https://www.linkedin.com/in/wildanm2/"} target="_blank">
            <LinkedinIcon />
          </Link>
        </Button>
        <Button
          size={"icon"}
          variant={"default"}
          className="shadow-primary shadow-lg"
        >
          <Link href={"https://ko-fi.com/sisableng"} target="_blank">
            <HandCoinsIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}

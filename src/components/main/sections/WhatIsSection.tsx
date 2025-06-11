import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function WhatIsSection() {
  return (
    <section className="container grid gap-10 md:grid-cols-2">
      <h1>
        <span className="text-shadow-primary/30 text-shadow-lg">
          BriefBriefun
        </span>{" "}
        tu <br /> apa bang Messi? 😐
      </h1>

      <div className="space-y-8">
        <p className="prose dark:prose-invert">
          BriefBriefun adalah web app untuk menghasilkan fake project brief dari
          klien fiktif. Kamu bisa pilih tipe project, industri, dan gaya
          komunikasi. Cocok buat desainer, developer, copywriter, dan siapa pun
          yang mau ngasah skill sambil seru-seruan.
        </p>

        <Button variant={"secondary"} className="dark ml-auto" asChild>
          <Link href={"/faq"}>
            Liat FAQ <ArrowUpRightIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
}

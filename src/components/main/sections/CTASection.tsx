import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
    <section className="container -mt-40 max-sm:-mt-32">
      <div className="bg-primary text-primary-foreground dark relative flex min-h-96 w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-4xl p-6 text-center">
        <div className="relative z-10 space-y-8">
          <h1 className="">Gimana Tertarik?</h1>
          <div>
            <h4 className="">
              Yuk, Gas aja dulu, portofolio gak akan nambah sendiri!
            </h4>
            <h4 className="">Gak dipungut biaya apapun.</h4>
          </div>

          <Button variant={"secondary"} size={"lg"} asChild>
            <Link href={"/sign-in"}>Mulai Ngebrief 🚀</Link>
          </Button>
        </div>

        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(rgba(9,9,11,0.3)_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(rgba(9,9,11,0.3)_1px,transparent_1px]",
          )}
        />

        <div className="absolute -right-40 -bottom-40 mask-t-from-10% mask-t-to-90%">
          <svg
            viewBox="0 0 100 100"
            height="400"
            width="400"
            opacity={0.5}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              r="45"
              cx="50"
              cy="50"
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="10"
            />
          </svg>
        </div>

        <div className="absolute -top-40 -left-40 mask-b-from-10% mask-b-to-90%">
          <svg
            viewBox="0 0 100 100"
            height="400"
            width="400"
            opacity={0.5}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              r="45"
              cx="50"
              cy="50"
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="10"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useSession } from "@/hooks/query/auth-hooks";

export default function HeroSection() {
  // const [isRobotLoaded, setIsRobotLoaded] = React.useState(false);

  const { session } = useSession();

  return (
    <section className="c-content relative mt-40 flex items-end justify-center md:mt-80">
      <div className="z-10 flex flex-col items-center justify-center gap-10">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h1 className="text-4xl leading-snug md:text-6xl">
            Biar{" "}
            <Image
              src={"/1f9e0.svg"}
              alt={"1f9e0"}
              width={32}
              height={32}
              className="inline-block size-10 md:size-15"
            />{" "}
            gak berdebu,{" "}
            <span className="text-primary inline-block rounded-full border p-0 px-3 backdrop-blur md:p-1 md:px-5 md:text-5xl">
              <SiteName />
            </span>{" "}
            <br className="block sm:hidden" />
            dulu yuk{" "}
            <Image
              src={"/1f60e.svg"}
              alt={"1f60e"}
              width={32}
              height={32}
              className="inline-block size-10 md:size-15"
            />
          </h1>

          {/* <h4 className="text-muted-foreground max-sm:text-base">
            Portofolio nggak akan nambah sendiri!
          </h4> */}
        </div>

        {session ? (
          <Button size={"lg"} className="h-12 font-semibold" asChild>
            <Link href={"/me"}>
              Ke Dashboard <ArrowRightIcon />
            </Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              size={"lg"}
              variant={"secondary"}
              className="h-12 font-semibold"
              asChild
            >
              <Link href={"/example"}>📝 Lihat Contohnya</Link>
            </Button>

            <Button size={"lg"} className="h-12 font-semibold" asChild>
              <Link href={"/sign-in"}>
                Oke Gas! <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Loading screen */}

      {/* <div
        className={clsx(
          "bg-primary animate-in fixed inset-0 z-50 grid place-content-center transition-all ease-in-out",
          isRobotLoaded
            ? "slide-in-from-bottom pointer-events-none opacity-0"
            : "opacity-100",
        )}
      >
        <h1 className="text-primary-foreground animate-pulse">
          <SiteName />
        </h1>
      </div> */}
    </section>
  );
}

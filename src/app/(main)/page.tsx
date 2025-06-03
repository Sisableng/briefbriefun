import Robot from "@/components/main/stuff/Robot";
import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import { ChevronRightCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="c-content">
      <div className="relative flex min-h-[40rem] items-end justify-center">
        <div className="z-10 flex flex-col items-center justify-center gap-10">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h1 className="text-5xl leading-snug md:text-6xl">
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
              dulu yuk{" "}
              <Image
                src={"/1f60e.svg"}
                alt={"1f60e"}
                width={32}
                height={32}
                className="inline-block size-10 md:size-15"
              />
            </h1>

            <h4 className="text-muted-foreground">
              Portofolio nggak akan nambah sendiri!
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size={"lg"}
              variant={"secondary"}
              className="h-12 font-semibold"
            >
              📝 Lihat Contohnya
            </Button>

            <Button size={"lg"} className="h-12 font-semibold" asChild>
              <Link href={"/sign-in"}>
                Oke Gas! <ChevronRightCircleIcon className="!size-6" />
              </Link>
            </Button>
          </div>
        </div>

        <Robot className="absolute inset-x-0 bottom-0" />

        <div className="absolute top-6 -z-[1] mask-b-from-10% mask-b-to-90%">
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
    </div>
  );
}

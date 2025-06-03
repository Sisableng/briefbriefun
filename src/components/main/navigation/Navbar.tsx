import SiteName from "@/components/SiteName";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href={"/"}>
          <h3 className="hover:text-primary font-bold">
            <SiteName />
          </h3>
        </Link>

        <Button className="font-semibold">Get Started</Button>
      </div>
    </div>
  );
}

import React from "react";
import Home from "./page.client";
import Spline from "@splinetool/react-spline/next";

export default function page() {
  return (
    <>
      <div className="absolute inset-0 top-10 z-1 hidden size-full h-dvh max-h-[70dvh] w-auto mask-b-from-20% mask-b-to-100% md:top-20 md:block">
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="mx-auto"
        />
      </div>

      <Home />
    </>
  );
}

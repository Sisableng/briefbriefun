import React from "react";
import Home from "./page.client";
import Spline from "@splinetool/react-spline/next";

export default function page() {
  return (
    <>
      <div className="absolute inset-0 top-10 z-1 size-full h-dvh max-h-[70dvh] w-auto mask-b-from-20% mask-b-to-100% md:top-20">
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="mx-auto"
        />
      </div>

      <div className="absolute inset-x-0 top-44 mx-auto w-max mask-b-from-10% mask-b-to-90% md:top-52">
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
      <Home />
    </>
  );
}

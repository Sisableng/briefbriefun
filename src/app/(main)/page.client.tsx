"use client";
import React from "react";
import HeroSection from "@/components/main/sections/HeroSection";
import DataInfoSection from "@/components/main/sections/DataInfoSection";
import dynamic from "next/dynamic";

import WhatIsSection from "@/components/main/sections/WhatIsSection";
import FeatureSection from "@/components/main/sections/FeatureSection";
import CTASection from "@/components/main/sections/CTASection";

const ExampleSection = dynamic(
  () => import("@/components/main/sections/ExampleSection"),
  { ssr: false },
);

const LeaderBoardSection = dynamic(
  () => import("@/components/main/sections/LeaderBoardSection"),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="space-y-40 md:space-y-60">
      <div className="space-y-10 md:space-y-20">
        <HeroSection />

        <div className="absolute inset-x-0 top-44 mx-auto w-max max-w-screen overflow-hidden mask-b-from-10% mask-b-to-90% md:top-52">
          <svg
            viewBox="0 0 100 100"
            height="400"
            width="400"
            opacity={0.5}
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-screen"
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

        <DataInfoSection />
      </div>

      <WhatIsSection />

      <FeatureSection />

      <ExampleSection />

      <CTASection />

      <LeaderBoardSection />
    </div>
  );
}

"use client";
import React from "react";
import HeroSection from "@/components/main/sections/HeroSection";
import DataInfoSection from "@/components/main/sections/DataInfoSection";
import dynamic from "next/dynamic";

const WhatIsSection = dynamic(
  () => import("@/components/main/sections/WhatIsSection"),
  { ssr: false },
);
const FeatureSection = dynamic(
  () => import("@/components/main/sections/FeatureSection"),
  { ssr: false },
);
const ExampleSection = dynamic(
  () => import("@/components/main/sections/ExampleSection"),
  { ssr: false },
);
const CTASection = dynamic(
  () => import("@/components/main/sections/CTASection"),
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

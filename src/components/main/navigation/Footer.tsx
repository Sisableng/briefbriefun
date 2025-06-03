import SiteName from "@/components/SiteName";
import React from "react";

export default function Footer() {
  return (
    <div className="container mt-auto flex min-h-60 flex-col justify-center">
      <h1 className="text-center opacity-10">
        <SiteName />
      </h1>
    </div>
  );
}

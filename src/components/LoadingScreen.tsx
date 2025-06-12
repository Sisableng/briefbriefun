import React from "react";
import SiteName from "./SiteName";

export default function LoadingScreen() {
  return (
    <div className="bg-primary fixed inset-0 z-50 grid place-content-center transition-opacity ease-in-out">
      <h1 className="text-primary-foreground animate-pulse">
        <SiteName />
      </h1>
    </div>
  );
}

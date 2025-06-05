import React from "react";
import SiteName from "./SiteName";

export default function LoadingScreen() {
  return (
    <div className="bg-background fixed inset-0 z-50 grid place-content-center transition-opacity ease-in-out">
      <h1 className="text-primary animate-pulse">
        <SiteName />
      </h1>
    </div>
  );
}

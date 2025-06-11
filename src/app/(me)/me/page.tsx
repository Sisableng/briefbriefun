import React from "react";
import MeHomePage from "./page.client";

export const metadata = {
  title: "Me",
};

export default async function page() {
  return <MeHomePage />;
}

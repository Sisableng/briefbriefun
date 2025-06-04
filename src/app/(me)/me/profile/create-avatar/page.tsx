import React from "react";
import CreateAvatarPage from "./page.client";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Create Avatar",
  description: "Create avatar page for your profile.",
};

export default function page() {
  return <CreateAvatarPage />;
}

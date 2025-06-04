import React from "react";
import ProfilePage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your personal information and settings.",
};

export default function page() {
  return <ProfilePage />;
}

import React, { FC } from "react";
import DetailProjectPage from "./page.client";

interface pageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export const metadata = {
  title: "Detail Project",
};

const page = async ({ params }: pageProps) => {
  const { projectId } = await params;

  return <DetailProjectPage />;
};

export default page;

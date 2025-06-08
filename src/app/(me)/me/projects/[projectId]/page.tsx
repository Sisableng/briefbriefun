import BackButton from "@/components/BackButton";
import React, { FC } from "react";

interface pageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const page = async ({ params }: pageProps) => {
  const { projectId } = await params;

  return (
    <div className="cme-content space-y-8">
      <BackButton />
      <p>{projectId}</p>
    </div>
  );
};

export default page;

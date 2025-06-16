import BackButton from "@/components/BackButton";
import ProjectForm from "@/components/forms/projects/ProjectForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Brief",
  description:
    "Generate a fake creative brief for a fictional Indonesian client based on the given parameters.",
};

export default function page() {
  return (
    <div className="cme-content space-y-8">
      <BackButton />

      <div className="space-y-2">
        <h2>Bikin Brief</h2>
        <p className="text-muted-foreground max-w-lg">
          Siap-siap ketemu permintaan yang kadang masuk akal… kadang juga nggak.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}

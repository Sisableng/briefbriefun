"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

export default async function page() {
  const testToast = () => {
    toast.info("Lorem, ipsum dolor sit amet consectetur adipisicing elit", {
      duration: Infinity,
    });
  };

  return (
    <div className="cme-content grid min-h-96 place-content-center">
      <Button onClick={testToast}>Test Toast</Button>
      {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta nam ducimus, velit omnis possimus ullam.</p> */}
    </div>
  );
}

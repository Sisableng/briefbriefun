"use client";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { LoaderCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SocialAuth() {
  const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null);

  async function socialAuth(provider: "google" | "github") {
    setIsLoading(provider);

    const result = await authClient.signIn.social({
      provider: provider,
      callbackURL: "/me",
      newUserCallbackURL: "/me/after-oauth",
    });

    if (result?.error) {
      console.log(result);
      toast.error(getErrorMessage(result?.error.code));
    }

    setIsLoading(null);
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => socialAuth("github")}
        disabled={!!isLoading}
      >
        {isLoading === "github" ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <SocialIcon name="github" />
        )}{" "}
        Github
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => socialAuth("google")}
        disabled={!!isLoading}
      >
        {isLoading === "google" ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <SocialIcon name="google" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

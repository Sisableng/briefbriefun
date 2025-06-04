"use client";
import { useAuth } from "@/components/context/auth-context";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPenIcon, WandSparklesIcon } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="grid min-h-96 place-content-center px-4">
        <h1 className="text-muted-foreground">Hah? lu siapa?</h1>
      </div>
    );
  }

  return (
    <div className="cme-content flex flex-col gap-8">
      <BackButton />

      <div className="flex items-start gap-4">
        <Avatar className="size-20 md:size-24">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="text-2xl">
            {user.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h2>{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>

          <div className="mt-6 flex items-center gap-2">
            <Button variant={"secondary"} asChild>
              <Link href={"/me/profile/create-avatar"}>
                <WandSparklesIcon />
                Buat Avatar
              </Link>
            </Button>
            <Button>
              <UserPenIcon /> Edit Profil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

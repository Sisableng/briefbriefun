"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LucideIcon, WandSparklesIcon } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useSession } from "@/hooks/query/auth-hooks";
import UserInfoTab from "@/components/me/profile/UserInfoTab";
import AccountTab from "@/components/me/profile/AccountTab";
import SecurityTab from "@/components/me/profile/SecurityTab";
import LoadingScreen from "@/components/LoadingScreen";

type ProfileTab = {
  title: string;
  value: string;
  icon?: LucideIcon;
};

const tabs = [
  {
    title: "Informasi",
    value: "info",
  },
  {
    title: "Akun",
    value: "account",
  },
  {
    title: "Keamanan",
    value: "security",
  },
] as const satisfies ProfileTab[];

type ActiveTab = (typeof tabs)[number]["value"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("info");

  const { user, isPending } = useSession();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="grid min-h-96 place-content-center px-4">
        <h1 className="text-muted-foreground">Hah? lu siapa?</h1>
      </div>
    );
  }

  return (
    <div className="cme-content flex h-full flex-col gap-8">
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
            <Button size={"sm"} variant={"outline"} asChild>
              <Link href={"/me/profile/create-avatar"}>
                <WandSparklesIcon />
                Buat Avatar
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="md:mt-20">
        <div className="flex w-full items-center gap-2 border-b pb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "secondary" : "ghost"}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="">
        {activeTab === "info" && <UserInfoTab />}
        {activeTab === "account" && <AccountTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}

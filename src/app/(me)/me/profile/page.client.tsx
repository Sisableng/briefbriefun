"use client";

import React, { useMemo } from "react";
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
import { useUrlParams } from "@/hooks/useUrlParams";
import { useSearchParams } from "next/navigation";
import UserAvatar from "@/components/me/avatar/UserAvatar";
import clsx from "clsx";

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
  // const [activeTab, setActiveTab] = React.useState<ActiveTab>("info");

  const searchParams = useSearchParams();
  const { updateParams } = useUrlParams(searchParams);

  const activeTabParams = searchParams.get("tab");

  const { user, isPending } = useSession();

  const handleActiveTab = (tab: string) => {
    updateParams("tab", tab, false);
  };

  const activeTab = useMemo(() => {
    if (activeTabParams) {
      return activeTabParams as ActiveTab;
    } else {
      return tabs[0].value;
    }
  }, [activeTabParams, tabs]);

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
        <UserAvatar
          src={user.image ?? undefined}
          fallback={user.name}
          className="size-20 md:size-24"
        />

        <div className="space-y-2">
          <h2>{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>

          <div className="mt-6 flex items-center gap-2">
            <Button size={"sm"} variant={"secondary"} asChild>
              <Link href={"/me/profile/create-avatar"}>
                <WandSparklesIcon />
                Buat Avatar
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <div className="flex w-full items-center gap-2 border-b pb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "outline" : "ghost"}
              onClick={() => handleActiveTab(tab.value)}
              className={clsx(activeTab === tab.value && "text-primary")}
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

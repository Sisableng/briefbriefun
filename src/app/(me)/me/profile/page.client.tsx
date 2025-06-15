"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, WandSparklesIcon } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useSession } from "@/hooks/query/auth-hooks";
import LoadingScreen from "@/components/LoadingScreen";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { SpringElement } from "@/components/animate-ui/components/spring-element";

const UserInfoTab = dynamic(
  () => import("@/components/me/profile/UserInfoTab"),
  { ssr: false },
);
const AccountTab = dynamic(() => import("@/components/me/profile/AccountTab"), {
  ssr: false,
});
const SecurityTab = dynamic(
  () => import("@/components/me/profile/SecurityTab"),
  { ssr: false },
);
const UserAvatar = dynamic(() => import("@/components/me/avatar/UserAvatar"), {
  ssr: false,
});

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

      <div className="flex items-start gap-4 max-sm:flex-col max-sm:items-center max-sm:text-center">
        <SpringElement>
          <UserAvatar
            src={user.image ?? undefined}
            fallback={user.name}
            className="size-20 md:size-24"
          />
        </SpringElement>

        <div className="space-y-2">
          <h2 className="max-sm:text-xl">{user.name}</h2>
          <p className="text-muted-foreground break-all">{user.email}</p>

          <div className="mt-6 flex items-center gap-2 max-sm:flex-col">
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
        <div className="flex w-full items-center gap-2 border-b pb-8 max-sm:justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "outline" : "ghost"}
              onClick={() => handleActiveTab(tab.value)}
              className={clsx(
                activeTab === tab.value &&
                  "not-dark:bg-primary not-dark:text-primary-foreground dark:text-primary not-dark:border-0",
              )}
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

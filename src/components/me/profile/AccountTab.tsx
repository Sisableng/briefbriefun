"use client";

import SocialIcon from "@/components/SocialIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useSession, useUnlinkAccount } from "@/hooks/query/auth-hooks";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { IdCardIcon, PlusIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import DrawerResponsive from "@/components/ui/drawer-responsive";
import { capitalize } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const acceptedProviders = ["google", "github"];

export default function AccountTab() {
  const [unlinkData, setUnlinkData] = React.useState<{
    providerId: "google" | "github";
    accountId: string;
  } | null>(null);

  const pathname = usePathname();

  const { user, refetch } = useSession();

  const { data, isPending } = useQuery({
    queryKey: ["account", user?.id],
    queryFn: async () => {
      const accounts = await authClient.listAccounts();

      return accounts;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const {
    mutateAsync: unlinkAccount,
    isError: isErrorUnlink,
    error: errorUnlink,
  } = useUnlinkAccount();

  async function handleLinkAccount(provider: "google" | "github") {
    const toastId = toast.loading("Sabar...");

    const { error } = await authClient.linkSocial({
      provider, // Provider to link
      callbackURL: pathname + "?tab=account", // Callback URL after linking completes
    });

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    toast.success("Akun udah terhubung.", { id: toastId });
  }

  async function handleUnlinkAccount() {
    if (!unlinkData) {
      toast.error("Data gak ketemu!");
      return;
    }

    const toastId = toast.loading("Sabar...");

    await unlinkAccount(unlinkData);

    if (isErrorUnlink && errorUnlink) {
      toast.error(errorUnlink.message, {
        id: toastId,
      });
      return;
    }

    toast.success("Akun udah dihapus", {
      id: toastId,
    });

    refetch({
      throwOnError: true,
    });
  }

  // Get missing providers
  const getMissingProviders = () => {
    if (!data?.data) return acceptedProviders;

    const existingProviders = data.data.map((item) => item.provider);
    return acceptedProviders.filter(
      (provider) => !existingProviders.includes(provider),
    );
  };

  const missingProviders = getMissingProviders();

  return (
    <div className="max-w-lg space-y-8">
      <h3 className="max-sm:text-lg">Yang Udah Nyantol</h3>

      {/* Existing linked accounts */}
      <div className="space-y-2">
        {isPending ? (
          <>
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </>
        ) : (
          data &&
          (data.error ? (
            <div>
              <p>Hmmm, Kek nya ada yang salah.</p>

              <pre>{JSON.stringify(data.error, null, 2)}</pre>
            </div>
          ) : (
            <>
              {data.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-card flex min-h-16 items-center gap-4 rounded-xl p-4"
                >
                  <div className="bg-secondary grid size-9 place-content-center rounded-full">
                    {item.provider === "credential" ? (
                      <IdCardIcon className="size-5" />
                    ) : (
                      <SocialIcon name={item.provider as any} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold capitalize">{item.provider}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(item.createdAt).toLocaleDateString("id", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {/* Add unlink button if needed */}
                  {item.provider !== "credential" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setUnlinkData({
                          providerId: item.provider as "google" | "github",
                          accountId: item.accountId,
                        })
                      }
                    >
                      <XIcon />
                      Putusin
                    </Button>
                  )}
                </div>
              ))}
            </>
          ))
        )}
      </div>

      <Separator />

      {/* Missing providers - show buttons to add them */}
      <h3 className="max-sm:text-lg">Provider yang Siap Digaet</h3>
      <div className="space-y-2">
        {missingProviders.map((provider) => (
          <div
            key={provider}
            className="bg-card flex min-h-16 items-center gap-4 rounded-xl border-2 border-dashed p-4"
          >
            <div className="bg-secondary grid size-9 place-content-center rounded-full">
              <SocialIcon name={provider as any} />
            </div>
            <div className="flex-1">
              <p className="font-semibold capitalize">{provider}</p>
              <p className="text-muted-foreground text-xs">Belum terhubung</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLinkAccount(provider as "google" | "github")}
              className="gap-2"
            >
              <PlusIcon className="size-4" />
              Gabungin
            </Button>
          </div>
        ))}
      </div>

      <DrawerResponsive
        open={!!unlinkData}
        onOpenChange={(open) => {
          if (open) {
            return;
          } else {
            setUnlinkData(null);
          }
        }}
        title={`Putusin ${capitalize(unlinkData?.providerId)}`}
        description="Sekali hapus, gak bisa di-undo, bro. Yakin nih?"
        className="md:max-w-xl"
        classNameContent="min-h-max"
      >
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Button
            variant={"secondary"}
            className="max-sm:w-full"
            onClick={() => setUnlinkData(null)}
          >
            G jadi deng
          </Button>
          <Button
            variant={"destructive"}
            className="max-sm:w-full"
            onClick={handleUnlinkAccount}
          >
            Putusin!
          </Button>
        </div>
      </DrawerResponsive>
    </div>
  );
}

"use client";
import { useSession, useUpdateUser } from "@/hooks/query/auth-hooks";
import React from "react";
import OptionItem from "../avatar/OptionItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

export default function UserInfoTab() {
  const { user } = useSession();
  const {
    mutateAsync: updateUser,
    error: updateError,
    isPending,
  } = useUpdateUser();

  const [newName, setNewName] = React.useState(user?.name ?? "");

  async function handleSave() {
    const toastId = toast.loading("Sabar...");

    await updateUser({
      name: newName,
    });

    if (updateError) {
      console.log("updateError", updateError);

      toast.error("Gagal disimpan!", {
        id: toastId,
      });
    }

    toast.success("Dah disimpan!", {
      id: toastId,
    });
  }

  return (
    <div className="space-y-8">
      <h3>Informasi Profil</h3>

      <OptionItem title="Ubah Nama" className="max-w-sm" labelFor="newName">
        <div className="relative">
          <Input
            id="newName"
            name="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="pr-10"
            disabled={isPending}
          />

          {newName !== user?.name && (
            <Button
              size={"icon"}
              className="absolute top-1.5 right-1.5"
              disabled={isPending}
              onClick={handleSave}
            >
              <span className="sr-only">Simpan</span>
              {isPending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <CheckIcon />
              )}
            </Button>
          )}
        </div>
      </OptionItem>

      <OptionItem title="Email" className="space-y-3">
        <p>{user?.email}</p>
      </OptionItem>

      <OptionItem title="Bergabung Sejak" className="space-y-3">
        <p>
          {user?.createdAt
            ? new Date(user?.createdAt).toLocaleDateString("id", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "-"}
        </p>
      </OptionItem>
    </div>
  );
}

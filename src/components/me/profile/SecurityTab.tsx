"use client";

import ChangePasswordForm from "@/components/forms/auth/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import DrawerResponsive from "@/components/ui/drawer-responsive";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/query/auth-hooks";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderCircleIcon,
  LockIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "@bprogress/next/app";

const loginSchema = z.object({
  password: z.string(),
});

export default function SecurityTab() {
  const [showForm, setShowForm] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const watchPw = form.watch("password");

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const queryClient = new QueryClient();

    const { error } = await authClient.deleteUser({
      password: values.password,
    });

    if (error) {
      console.log(error);
      toast.error(getErrorMessage(error.code));
      return;
    }

    toast.success("Done, see ya!");
    queryClient.clear();

    await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      router.push("/sign-in");
    });
  }

  return (
    <div className="max-w-lg space-y-8">
      <h3 className="max-sm:text-lg">Keamanan Akun</h3>

      <Button variant={"secondary"} onClick={() => setShowForm(!showForm)}>
        {showForm ? (
          <>
            <XIcon /> G jadi deng
          </>
        ) : (
          <>
            <LockIcon />
            Ganti Password
          </>
        )}
      </Button>

      {showForm && <ChangePasswordForm />}

      <Separator />

      <h3 className="max-sm:text-lg">Zona Bahaya!</h3>

      <div className="space-y-6">
        <div className="text-destructive space-y-2">
          <h4 className="max-sm:text-lg">Ingat!</h4>
          <p className="max-sm:text-sm">
            Sekali hapus, akun kamu bakal lenyap. Serius, ini bukan latihan.
          </p>
        </div>

        <Separator />

        <div className="flex justify-start">
          <Button
            variant={"secondary"}
            className="border-destructive border"
            onClick={() => setIsOpen(true)}
          >
            Iya ngerti!
          </Button>
        </div>

        <DrawerResponsive
          open={isOpen}
          onOpenChange={setIsOpen}
          title={`Yakin nih?`}
          description="Sekali hapus, gak bisa di-undo, bro. Yakin mau hapus akun?"
          className="md:max-w-xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 border-t p-1 pt-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-2">
                      <FormLabel className="text-foreground">
                        Masukin Password Dulu
                      </FormLabel>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground mr-2 flex cursor-pointer items-center gap-1.5 rounded-full border p-1 px-2 text-xs"
                      >
                        {showPassword ? (
                          <>
                            <EyeOffIcon className="inline-flex size-3" />
                            Tutup
                          </>
                        ) : (
                          <>
                            <EyeIcon className="inline-flex size-3" />
                            Liat
                          </>
                        )}
                      </button>
                    </div>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password nya"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="ml-2 text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Button
                  type="button"
                  variant={"secondary"}
                  className="max-sm:w-full"
                  onClick={() => setIsOpen(false)}
                >
                  G jadi deng
                </Button>
                <Button
                  type="submit"
                  variant={"destructive"}
                  className="max-sm:w-full"
                  disabled={isSubmitting || watchPw.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      Sabar... <LoaderCircleIcon className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Hapus Akun <ArrowRightIcon />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DrawerResponsive>
      </div>
    </div>
  );
}

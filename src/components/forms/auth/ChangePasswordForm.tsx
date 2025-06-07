"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { useRouter } from "@bprogress/next/app";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const passwordSchema = z
  .string()
  .min(8, "Password lu kependekan!")
  .regex(/[A-Z]/, "Masukin minimal 1 huruf gede napa!")
  .regex(/\d/, "Mana angkanya, bos? Password tanpa angka tuh cupu!")
  .regex(
    /[@$!%*?&]/,
    "Kurang bumbu nih, tambahin 1 karakter spesial (@$!%*?&) biar makin pedes!",
  );

const loginSchema = z
  .object({
    currentPassword: passwordSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password gak sama!",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await authClient.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.password,
      revokeOtherSessions: true,
    });

    if (result?.error) {
      console.log(result);
      toast.error(getErrorMessage(result?.error.code));
      return;
    }

    toast.success("Password dah diubah!");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Lama</FormLabel>

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Passwordnya</FormLabel>
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

        <div>
          <Label className="cursor-pointer">
            <Checkbox
              checked={showPassword}
              onCheckedChange={(val) => setShowPassword(val as boolean)}
            />

            <span>{showPassword ? "Tutup" : "Liat"} Password</span>
          </Label>
        </div>

        <Button
          type="submit"
          size={"lg"}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              Sabar... <LoaderCircleIcon className="animate-spin" />
            </>
          ) : (
            <>
              Simpan <ArrowRightIcon />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

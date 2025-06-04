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
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/auth-client";
import { setPassword } from "./actions";
import { useRouter } from "@bprogress/next/app";

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
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password gak sama!",
    path: ["confirmPassword"],
  });

export default function PasswordForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await setPassword(values.password);

    if (result?.error) {
      console.log(result);
      toast.error(getErrorMessage(result?.error.message));
    } else {
      router.push("/me");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-2">
                <FormLabel>Password</FormLabel>

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

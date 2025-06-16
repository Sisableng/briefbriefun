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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signin } from "./actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@bprogress/next/app";
import SocialAuth from "./SocialAuth";

const allowedEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
];

const loginSchema = z.object({
  email: z.string().email("Masukin email yang bener!"),
  // .refine(
  //   (email) => {
  //     const domain = email.split("@")[1];
  //     return allowedEmailDomains.includes(domain);
  //   },
  //   {
  //     message:
  //       "Cuma nerima email dari Gmail, Yahoo, atau Outlook aja ya bos!",
  //   },
  // ),
  password: z
    .string()
    .min(8, "Password lu kependekan!")
    .regex(/[A-Z]/, "Masukin minimal 1 huruf gede napa!")
    .regex(/\d/, "Mana angkanya, bos? Password tanpa angka tuh cupu!")
    .regex(
      /[@$!%*?&]/,
      "Kurang bumbu nih, tambahin 1 karakter spesial (@$!%*?&) biar makin pedes!",
    ),
});

export default function SigninForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await signin(values);

    if (result?.error) {
      console.log(result);
      toast.error(getErrorMessage(result?.error.message));
    } else {
      router.push("/me");
    }
  }

  return (
    <>
      <SocialAuth />

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@gmail.com" {...field} />
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

          <div>
            <Label className="text-muted-foreground items-start text-xs sm:text-sm">
              <Checkbox className="mt-1" />
              Saya menyetujui peraturan yang dibuat oleh Luffy untuk mencari
              Onepiece dan mengalahkan madara dengan menaiki awan kinton.
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
                Masuk <ArrowRightIcon />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

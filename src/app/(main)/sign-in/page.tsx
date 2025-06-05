import SigninForm from "@/components/forms/auth/SigninForm";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="c-content mt-10">
      <div className="from-card mx-auto w-full max-w-lg space-y-8 rounded-4xl bg-linear-to-b to-transparent p-6 md:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1>Masuk</h1>
          <p className="text-muted-foreground">
            Ga punya akun?{" "}
            <Link href={"/sign-up"} className="text-primary">
              Daftar dulu!
            </Link>
          </p>
        </div>

        <SigninForm />
      </div>
    </div>
  );
}

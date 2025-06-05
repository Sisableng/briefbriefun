import SignupForm from "@/components/forms/auth/SignupForm";
import Link from "next/link";
import { Metadata } from "next/types";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="c-content mt-10">
      <div className="from-card mx-auto w-full max-w-lg space-y-8 rounded-4xl bg-linear-to-b to-transparent p-6 md:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1>Buat Akun</h1>
          <p className="text-muted-foreground">
            Udah punya akun?{" "}
            <Link href={"/sign-in"} className="text-primary">
              Masuk sini!
            </Link>
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}

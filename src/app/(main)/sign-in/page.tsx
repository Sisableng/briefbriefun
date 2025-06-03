import SigninForm from "@/components/forms/auth/SigninForm";
import React from "react";

export default function SignInPage() {
  return (
    <div className="c-content mt-10 max-w-lg">
      <div className="from-card space-y-8 rounded-xl bg-linear-to-b to-transparent p-6">
        <div className="mb-14 space-y-2 text-center">
          <p className="text-muted-foreground">Login dulu, ya!</p>
          <h1>Masuk</h1>
        </div>

        <SigninForm />
      </div>
    </div>
  );
}

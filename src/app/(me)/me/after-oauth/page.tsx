import PasswordForm from "@/components/forms/auth/PasswordForm";
import SiteName from "@/components/SiteName";
import React from "react";

export default function AfterOauthPage() {
  return (
    <div className="c-content mt-10 max-w-lg space-y-10">
      <h1 className="text-muted text-center">
        <SiteName />
      </h1>

      <div className="from-card relative mt-20 space-y-8 rounded-4xl bg-gradient-to-b to-transparent p-6 md:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1>
            Buat{" "}
            <span className="from-foreground to-primary via-foreground bg-gradient-to-b bg-clip-text text-transparent">
              Password
            </span>{" "}
            dulu!
          </h1>
          <p className="text-muted-foreground">Demi keamanan bro 🙂</p>
        </div>

        <PasswordForm />
      </div>
    </div>
  );
}

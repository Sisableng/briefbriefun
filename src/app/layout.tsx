import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import BProgressProvider from "@/components/providers/bprogress-provider";
import SonnerProvider from "@/components/providers/sonner-provider";
import AuthProviders from "@/components/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B2f",
  description: "Welcome to BriefBriefun",
  icons: {
    icon: "/icon/favicon.ico",
    shortcut: "/icon/apple-touch-icon.png",
    apple: "/icon/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon",
      url: "/icon/apple-touch-icon.png",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <BProgressProvider>
                <SonnerProvider>{children}</SonnerProvider>
              </BProgressProvider>
            </ThemeProvider>
          </AuthProviders>
        </QueryProvider>
      </body>
    </html>
  );
}

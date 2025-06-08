"use client";

import * as React from "react";
import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeItem = {
  title: string;
  mode: string;
  icon: LucideIcon;
};

const themes: ThemeItem[] = [
  {
    title: "Light",
    mode: "light",
    icon: SunIcon,
  },
  {
    title: "Dark",
    mode: "dark",
    icon: MoonIcon,
  },
  {
    title: "System",
    mode: "system",
    icon: MonitorIcon,
  },
];

export function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {resolvedTheme === "system" ? (
            <MonitorIcon />
          ) : resolvedTheme === "light" ? (
            <SunIcon />
          ) : (
            <MoonIcon />
          )}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.mode}
            onClick={() => setTheme(theme.mode)}
          >
            <theme.icon />
            {theme.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

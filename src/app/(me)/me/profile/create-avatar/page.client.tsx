"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { LoaderCircleIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AVATAR_STYLES, getStyleMetadata } from "@/utils/avatarStyles";

const OptionItem = dynamic(() => import("@/components/me/avatar/OptionItem"), {
  ssr: false,
});

const PreviewAvatar = dynamic(
  () => import("@/components/me/avatar/PreviewAvatar"),
  {
    ssr: false,
    loading: () => {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <LoaderCircleIcon className="text-muted-foreground size-10 animate-spin" />
          <p>Lagi proses...</p>
        </div>
      );
    },
  },
);

export default function CreateAvatarPage() {
  const [options, setOptions] = React.useState({
    rotate: 0,
    scale: 100,
    radius: 0,
  });

  const [selectedType, setSelectedType] = React.useState(AVATAR_STYLES[0]);

  const handleChangeOptions = (name: string, value: any) => {
    setOptions((prev: any) => {
      const newOptions = { ...prev };
      newOptions[name] = value;
      return newOptions;
    });
  };

  return (
    <div className="cme-content flex size-full flex-1 flex-col gap-8">
      <BackButton />

      <div className="flex size-full flex-1 flex-col gap-10 sm:flex-row">
        <PreviewAvatar type={selectedType} options={options} />

        <Separator className="sm:hidden" />

        <div className="shrink-0 space-y-8 overflow-y-auto p-1 md:w-60">
          <Select
            value={selectedType}
            onValueChange={(v) => setSelectedType(v as any)}
          >
            <SelectTrigger className="w-full flex-1 data-[size=default]:h-12">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="max-h-96 sm:w-[calc(var(--spacing)*60-var(--spacing)*1)]">
              {AVATAR_STYLES.map((styleName) => {
                const metadata = getStyleMetadata(styleName);
                const slugifyKey = styleName
                  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                  .toLowerCase();

                return (
                  <SelectItem key={styleName} value={styleName}>
                    <Image
                      src={`https://api.dicebear.com/9.x/${slugifyKey}/webp`}
                      width={36}
                      height={36}
                      alt=""
                      className="bg-secondary rounded-md object-contain"
                    />
                    {metadata.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Separator />

          {/* Rest of your options components remain the same */}
          <OptionItem title="Rotasi">
            <div className="flex items-center gap-2">
              <Button
                size={"icon"}
                variant="secondary"
                onClick={() =>
                  handleChangeOptions("rotate", (options.rotate ?? 0) - 10)
                }
                disabled={(options.rotate ?? 0) === 0}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>

              <Select
                value={String(options.rotate)}
                onValueChange={(v) => handleChangeOptions("rotate", Number(v))}
              >
                <SelectTrigger className="flex-1 text-center">
                  <SelectValue placeholder="Rotasi" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  {[...Array(360 / 10 + 1)].map((_, i) => {
                    const value = i * 10;
                    return (
                      <SelectItem key={value} value={String(value)}>
                        {value}°
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Button
                size={"icon"}
                variant="secondary"
                onClick={() =>
                  handleChangeOptions("rotate", (options.rotate ?? 0) + 10)
                }
                disabled={(options.rotate ?? 0) === 360}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </OptionItem>

          <OptionItem title="Skala">
            <div className="flex items-center gap-2">
              <Button
                size={"icon"}
                variant="secondary"
                onClick={() =>
                  handleChangeOptions("scale", (options.scale ?? 0) - 10)
                }
                disabled={(options.scale ?? 0) === 0}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>

              <Select
                value={String(options.scale)}
                onValueChange={(v) => handleChangeOptions("scale", Number(v))}
              >
                <SelectTrigger className="flex-1 text-center">
                  <SelectValue placeholder="Skala" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  {[...Array(200 / 10 + 1)].map((_, i) => {
                    const value = i * 10;
                    return (
                      <SelectItem key={value} value={String(value)}>
                        {value}%
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Button
                size={"icon"}
                variant="secondary"
                onClick={() =>
                  handleChangeOptions("scale", (options.scale ?? 0) + 10)
                }
                disabled={(options.scale ?? 0) === 200}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </OptionItem>

          <OptionItem title="Radius">
            <div className="flex items-center gap-2">
              <Button
                size={"icon"}
                variant="secondary"
                onClick={() =>
                  handleChangeOptions("radius", (options.radius ?? 0) - 10)
                }
                disabled={(options.radius ?? 0) === 0}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>

              <Select
                value={String(options.radius)}
                onValueChange={(v) => handleChangeOptions("radius", Number(v))}
              >
                <SelectTrigger className="flex-1 text-center">
                  <SelectValue placeholder="Radius" />
                </SelectTrigger>
                <SelectContent className="max-h-96">
                  {[...Array(50 / 5 + 1)].map((_, i) => {
                    const value = i * 5;
                    return (
                      <SelectItem key={value} value={String(value)}>
                        {value}%
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                size={"icon"}
                variant="secondary"
                onClick={() =>
                  handleChangeOptions("radius", (options.radius ?? 0) + 10)
                }
                disabled={(options.radius ?? 0) === 50}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </OptionItem>
        </div>
      </div>
    </div>
  );
}

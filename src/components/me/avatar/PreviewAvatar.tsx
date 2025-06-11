"use client";
import { createRandomSeed } from "@/lib/utils";
import { createAvatar } from "@dicebear/core";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DicesIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUpdateUser } from "@/hooks/query/auth-hooks";
import { importAvatarStyle } from "@/utils/avatarStyles";

interface PreviewAvatarProps {
  type: string;
  options: any;
}

const PreviewAvatar = ({ type, options }: PreviewAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [seed, setSeed] = React.useState(createRandomSeed());
  const [currentStyle, setCurrentStyle] = React.useState<any>(null);
  const [svg, setSvg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    mutateAsync: updateUser,
    error: updateError,
    isPending,
  } = useUpdateUser();

  const debounced = useDebounce((term: string) => {
    if (term.length > 0) {
      setSeed(term);
    } else {
      setSeed(createRandomSeed());
    }
  }, 500);

  // Dynamically load the specific style when type changes
  React.useEffect(() => {
    if (!type) return;

    const loadStyle = async () => {
      setIsLoading(true);
      try {
        const style = await importAvatarStyle(type);
        setCurrentStyle(style);
      } catch (error) {
        console.error("Failed to load style:", error);
        // Fallback to a basic style
        try {
          const fallbackStyle = await importAvatarStyle("initials");
          setCurrentStyle(fallbackStyle);
        } catch (fallbackError) {
          console.error("Failed to load fallback style:", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStyle();
  }, [type]);

  // Generate avatar when style, seed, or options change
  React.useEffect(() => {
    if (currentStyle && !isLoading) {
      try {
        const avatar = createAvatar(currentStyle, {
          seed,
          ...options,
        });
        setSvg(avatar.toDataUri());
      } catch (error) {
        console.error("Failed to generate avatar:", error);
      }
    }
  }, [currentStyle, seed, options, isLoading]);

  const urlParam = React.useMemo(() => {
    return new URL(
      `https://api.dicebear.com/9.x/${type
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase()}/webp`,
    );
  }, [type]);

  async function handleSave() {
    const toastId = toast.loading("Sabar...");

    try {
      await updateUser({
        image: avatarUrl,
      });

      toast.success("Dah disimpan!", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Gagal menyimpan!", {
        id: toastId,
      });
    }
  }

  React.useEffect(() => {
    if (seed) {
      urlParam.searchParams.set("seed", seed);
    }

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlParam.searchParams.set(key, String(value));
        }
      });
    }

    setAvatarUrl(urlParam.toString());
  }, [type, seed, options, urlParam]);

  if (isLoading || !currentStyle || !svg) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <LoaderCircleIcon className="text-muted-foreground size-10 animate-spin" />
        <p>Loading avatar...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-4 md:border-r">
      <Image
        src={svg}
        width={250}
        height={250}
        alt=""
        className="bg-secondary size-40 rounded-xl md:size-60"
      />

      <div className="text-muted-foreground mx-auto mb-10 max-w-sm text-center text-sm">
        <p className="">
          Avatar ini dibikin pake Dicebear API, kalo kamu pengen bikin yang
          lebih advance langsung aja buat disini{" "}
          <Badge variant={"outline"} asChild>
            <Link
              href={"https://www.dicebear.com/playground/"}
              target="_blank"
              className="text-primary"
            >
              Playground
              <ArrowUpRightIcon />
            </Link>
          </Badge>
          <br />
          <br /> Kalo udah, Copy URL nya lalu masukin ke dalam input dibawah.
        </p>
      </div>

      {type === "initials" && (
        <Input
          placeholder="Masukin Nama Lengkap"
          onChange={(e) => debounced(e.target.value)}
          className="max-w-sm"
        />
      )}

      <Input
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className="max-w-sm"
      />

      <div className="flex items-center gap-2">
        <Button
          size={"lg"}
          variant={"secondary"}
          onClick={() => setSeed(createRandomSeed())}
          disabled={isPending || isLoading}
        >
          <DicesIcon />
          Random
        </Button>
        <Button
          size={"lg"}
          onClick={handleSave}
          disabled={isPending || isLoading}
        >
          {isPending ? (
            <>
              Sabar... <LoaderCircleIcon className="animate-spin" />
            </>
          ) : (
            <>
              Simpan <ArrowRightIcon />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PreviewAvatar;

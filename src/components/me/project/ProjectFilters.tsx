import { useUrlParams } from "@/hooks/useUrlParams";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { FC } from "react";
import { RotateCcwIcon, XIcon } from "lucide-react";
import {
  industryOptions,
  typeOptions,
} from "@/components/forms/projects/options";
import { Scroller } from "@/components/ui/scroller";
import { Button } from "@/components/ui/button";

interface ProjectFiltersProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ProjectFilters = ({ open, onOpenChange }: ProjectFiltersProps) => {
  const searchParams = useSearchParams();
  const { updateParams, getParam, clearParams } = useUrlParams(searchParams);

  const handleUpdateParms = (name: string, value: string) => {
    updateParams({
      [name]: value,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 50,
          }}
          className="fixed inset-x-0 bottom-4 z-10 mx-auto w-max max-w-sm"
        >
          <div className="bg-secondary dark flex items-center gap-2 rounded-full p-2 px-2">
            <Scroller
              orientation="horizontal"
              className="w-full flex-1"
              hideScrollbar
              asChild
            >
              <div className="flex items-center gap-2">
                <Select
                  value={getParam("type") ?? undefined}
                  onValueChange={(v) => handleUpdateParms("type", v)}
                >
                  <SelectTrigger className="dark max-w-32 rounded-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="dark max-h-96">
                    {typeOptions
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((group) => (
                        <SelectGroup key={group.name} className="not-last:mb-4">
                          <SelectLabel>{group.name}</SelectLabel>
                          {group.options
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((opt) => (
                              <SelectItem
                                key={opt.name}
                                value={opt.value}
                                className="text-sm"
                              >
                                {opt.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      ))}
                  </SelectContent>
                </Select>

                <Select
                  value={getParam("industry") ?? undefined}
                  onValueChange={(v) => handleUpdateParms("industry", v)}
                >
                  <SelectTrigger className="dark max-w-32 rounded-full">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent className="dark">
                    {industryOptions
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((opt) => (
                        <SelectItem
                          key={opt.name}
                          value={opt.value}
                          className="text-sm"
                        >
                          {opt.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select
                  value={getParam("status") ?? undefined}
                  onValueChange={(v) => handleUpdateParms("status", v)}
                >
                  <SelectTrigger className="dark max-w-32 rounded-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="dark">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inProgress">Lagi otw</SelectItem>
                    <SelectItem value="completed">Beres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Scroller>

            {searchParams.toString().length > 0 && (
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={clearParams}
                className="bg-input/50 hover:bg-input"
              >
                <RotateCcwIcon />
              </Button>
            )}

            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground grid size-6 cursor-pointer place-content-center"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectFilters;

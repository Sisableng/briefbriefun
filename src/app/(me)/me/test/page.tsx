"use client";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteItemData,
} from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

export default function page() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteItemData | null>(null);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  // const testToast = () => {
  //   toast.info("Lorem, ipsum dolor sit amet consectetur adipisicing elit", {
  //     duration: Infinity,
  //   });
  // };

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const res = await fetch("http://localhost:3028/api/redis-test", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     userId: session?.user.id,
  //   }),
  // });
  // const data = await res.json();

  return (
    <div className="cme-content grid min-h-96 place-content-center gap-6">
      {/* <Button onClick={testToast}>Test Toast</Button> */}
      <Autocomplete
        value={selectedValue}
        onChange={setSelectedValue}
        onSelect={setSelectedOption}
        placeholder="Search fruits..."
      >
        <AutocompleteContent>
          {/* Grouped items */}
          <AutocompleteGroup label="Citrus Fruits">
            <AutocompleteItem value="orange">🍊 Orange</AutocompleteItem>
            <AutocompleteItem value="lemon">🍋 Lemon</AutocompleteItem>
            <AutocompleteItem value="lime">🟢 Lime</AutocompleteItem>
          </AutocompleteGroup>

          <AutocompleteGroup label="Berries">
            <AutocompleteItem value="strawberry">
              🍓 Strawberry
            </AutocompleteItem>
            <AutocompleteItem value="blueberry">🫐 Blueberry</AutocompleteItem>
            <AutocompleteItem value="raspberry">🫐 Raspberry</AutocompleteItem>
          </AutocompleteGroup>

          {/* More non-grouped items */}
          <AutocompleteItem value="grape">🍇 Grape</AutocompleteItem>
          <AutocompleteItem value="watermelon">🍉 Watermelon</AutocompleteItem>
        </AutocompleteContent>
      </Autocomplete>

      <Button
        onClick={() => {
          console.log({
            selectedValue,
            selectedOption,
          });
        }}
      >
        Submit
      </Button>

      <Popover>
        <PopoverTrigger>
          <PopoverAnchor asChild>
            <Input placeholder="test" className="h-10 w-full" />
          </PopoverAnchor>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>

      {/* <pre>{JSON.stringify({ session }, null, 2)}</pre> */}
    </div>
  );
}

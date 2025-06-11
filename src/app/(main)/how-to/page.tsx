import { howTo } from "@/other-stuff/information";
import React from "react";
import Markdown from "react-markdown";

export default function HowToPage() {
  return (
    <div className="c-content">
      <div className="prose dark:prose-invert mx-auto">
        <Markdown>{howTo}</Markdown>
      </div>
    </div>
  );
}

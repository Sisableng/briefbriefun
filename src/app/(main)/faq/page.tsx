import { faq } from "@/other-stuff/information";
import React from "react";
import Markdown from "react-markdown";

export const metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <div className="c-content">
      <div className="prose dark:prose-invert mx-auto">
        <Markdown>{faq}</Markdown>
      </div>
    </div>
  );
}

import { example } from "@/other-stuff/information";
import React from "react";
import Markdown from "react-markdown";

export const metadata = {
  title: "Example",
};

export default function ExamplePage() {
  return (
    <div className="c-content">
      <div className="prose dark:prose-invert mx-auto">
        <Markdown
          components={{
            code: (props) => {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");

              return (
                <div className="prose-none prose-pre:py-0">
                  {match && (
                    <p className="text-primary font-semibold capitalize">
                      {match[1]}
                    </p>
                  )}
                  <code className="text-wrap break-all">{props.children}</code>
                </div>
              );
            },
          }}
        >
          {example}
        </Markdown>
      </div>
    </div>
  );
}

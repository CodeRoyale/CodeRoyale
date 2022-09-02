import React, { useState } from "react";
import useCollapse from "react-collapsed";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { HalfArrowDown, HalfArrowUp } from "../icons";
import { Check } from "../icons/Check";
import "../styles/markdown.css";

interface VetoQuestionCardProps {
  title: string;
  description: string;
}

export const VetoQuestionCard: React.FC<VetoQuestionCardProps> = ({
  title,
  description,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({
    collapsedHeight: 100,
  });

  return (
    <div className="bg-primary-800 rounded-lg">
      <div className="flex justify-between items-center bg-primary-700 text-lg font-semibold text-primary-100 rounded-t-lg px-4 py-3">
        {title}
        <span className="flex items-center font-normal text-sm cursor-pointer">
          Vote question
          <Check className="ml-2" fill="#DEE3EA" width={18} height={18} />
          {/* <Check className="ml-2" fill="#00FF00" width={18} height={18} /> */}
        </span>
      </div>
      <div className="markdown" {...getCollapseProps()}>
        <ReactMarkdown
          className="px-4 py-3 prose prose-lg max-w-none"
          /* eslint-disable react/no-children-prop */
          children={description}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
      <div
        className="flex bg-primary-700 text-primary-100 rounded-b-lg px-4 py-3"
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? (
          <HalfArrowUp width={24} height={24} className="fill-primary-100" />
        ) : (
          <HalfArrowDown width={24} height={24} className="fill-primary-100" />
        )}
        <span className="ml-2">{isExpanded ? "Show less" : "Show more"}</span>
      </div>
    </div>
  );
};

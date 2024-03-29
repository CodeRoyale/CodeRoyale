import React, { useState } from "react";
import useCollapse from "react-collapsed";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Delete, HalfArrowDown, HalfArrowUp } from "../icons";
import { Check } from "../icons/Check";

interface VetoQuestionCardProps {
  title: string;
  description: string;
  marginTop?: string;
  isSelected: boolean;
  canVote: boolean;
  voteQuestionOnClick: () => void;
}

export const VetoQuestionCard: React.FC<VetoQuestionCardProps> = ({
  title,
  description,
  marginTop,
  isSelected,
  canVote,
  voteQuestionOnClick,
}) => {
  const [selectedQuestionState, setSelectedQuestionState] = useState({
    color: "#00FF00",
    displayChild: (
      <>
        Question vote added
        <Check className="ml-2" fill="#00FF00" width={18} height={18} />
      </>
    ),
  });
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({
    collapsedHeight: 100,
  });

  const handleIsSelectedMouseOver = () => {
    setSelectedQuestionState({
      color: "#FF0000",
      displayChild: (
        <>
          Delete question vote
          <Delete className="ml-2" fill="#FF0000" width={18} height={18} />
        </>
      ),
    });
  };

  const handleIsSelectedMouseLeave = () => {
    setSelectedQuestionState({
      color: "#00FF00",
      displayChild: (
        <>
          Question vote added
          <Check className="ml-2" fill="#00FF00" width={18} height={18} />
        </>
      ),
    });
  };

  return (
    <div className={`bg-primary-800 rounded-lg ${marginTop}`}>
      <div className="flex justify-between items-center bg-primary-700 text-lg font-semibold text-primary-100 rounded-t-lg px-4 py-3">
        {title}
        {canVote ? (
          isSelected ? (
            <span
              className="flex items-center font-normal text-sm cursor-pointer transition duration-75 ease-in-out"
              onClick={voteQuestionOnClick}
              style={{
                color: selectedQuestionState.color,
              }}
              onMouseOver={handleIsSelectedMouseOver}
              onMouseLeave={handleIsSelectedMouseLeave}
            >
              {selectedQuestionState.displayChild}
            </span>
          ) : (
            <span
              className="flex items-center font-normal text-sm cursor-pointer"
              onClick={voteQuestionOnClick}
            >
              Vote question
              <Check className="ml-2" fill="#DEE3EA" width={18} height={18} />
            </span>
          )
        ) : null}
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
                  // @ts-ignore
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

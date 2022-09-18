import React from "react";
import { Button } from "./Button";
import { Timer } from "./Timer";

interface VetoControlPanelProps {
  timeLimit: number;
  confirmVoteBtnIsDisabled: boolean;
  confirmVoteOnClick: () => void;
}

export const VetoControlPanel: React.FC<VetoControlPanelProps> = ({
  timeLimit,
  confirmVoteBtnIsDisabled,
  confirmVoteOnClick,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-primary-800 rounded-lg">
      <div className="flex flex-col">
        <span className="text-sm text-primary-300">Time left</span>
        <Timer milliseconds={timeLimit} />
      </div>
      <Button
        buttonClass="primary"
        size="normal"
        onClick={confirmVoteOnClick}
        disabled={confirmVoteBtnIsDisabled}
      >
        Confirm vote
      </Button>
    </div>
  );
};

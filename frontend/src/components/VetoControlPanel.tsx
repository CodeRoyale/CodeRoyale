import React from "react";
import { Button } from "./Button";
import { Timer } from "./Timer";

export const VetoControlPanel: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-primary-800 rounded-lg">
      <div className="flex flex-col">
        <span className="text-sm text-primary-300">Time left</span>
        <Timer milliseconds={180000} />
      </div>
      <Button buttonClass="primary" size="normal">
        Confirm vote
      </Button>
    </div>
  );
};

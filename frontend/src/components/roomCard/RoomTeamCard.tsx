import React from "react";

interface RoomTeamCardProps {
  teamName: string;
  teamMemberCards: React.ReactNode | null;
  joinOrLeaveTeamBtnText: "Join" | "Leave";
  joinTeamOnClick: () => void;
  leaveTeamOnClick: () => void;
}

export const RoomTeamCard: React.FC<RoomTeamCardProps> = ({
  teamName,
  teamMemberCards,
  joinOrLeaveTeamBtnText,
  joinTeamOnClick,
  leaveTeamOnClick,
}) => (
  <div className="flex flex-col bg-primary-900 rounded-md">
    <div className="py-4 pl-2 pr-8">
      <h1 className="text-primary-100 font-semibold text-lg">{teamName}</h1>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {!teamMemberCards ? (
          <span className="col-span-2 text-primary-300 text-sm mt-4">
            This team currently has no members in it.
          </span>
        ) : (
          teamMemberCards
        )}
      </div>
    </div>
    {joinOrLeaveTeamBtnText === "Join" ? (
      <button
        type="button"
        className="mt-auto bg-[#5575E7] w-full text-primary-100 px-4 py-2 rounded-b-md transition duration-200 ease-in-out hover:bg-[#7992EC] focus:outline focus:outline-offset-2 focus:outline-focus-outline"
        onClick={joinTeamOnClick}
      >
        Join
      </button>
    ) : (
      <button
        type="button"
        className="mt-auto bg-error-red w-full text-primary-100 px-4 py-2 rounded-b-md transition duration-200 ease-in-out hover:bg-[#f5594d] focus:outline focus:outline-offset-2 focus:outline-focus-outline"
        onClick={leaveTeamOnClick}
      >
        Leave
      </button>
    )}
  </div>
);

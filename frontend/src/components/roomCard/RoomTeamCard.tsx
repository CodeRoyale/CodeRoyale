import React from "react";

interface RoomTeamCardProps {
  teamName: string;
  teamMemberCards: React.ReactNode | null;
}

export const RoomTeamCard: React.FC<RoomTeamCardProps> = ({
  teamName,
  teamMemberCards,
}) => (
  <div className="bg-primary-900 rounded-md">
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
    <button
      type="button"
      className="bg-[#5575E7] w-full text-primary-100 px-4 py-2 rounded-b-md transition duration-200 ease-in-out hover:bg-[#7992EC] focus:outline focus:outline-offset-2 focus:outline-focus-outline"
    >
      Join
    </button>
  </div>
);

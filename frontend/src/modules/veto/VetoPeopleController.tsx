import React from "react";
import { useRoom } from "../../global-stores";
import { VetoUserCardController } from "./VetoUserCardController";

export const VetoPeopleController = () => {
  const room = useRoom((state) => state.room);

  return (
    <div className="flex flex-col mt-8">
      <h1 className="text-primary-100 font-bold text-2xl">People in Veto</h1>
      <span className="text-primary-200 text-lg mt-4">Voted</span>
      <div className="py-4">
        {room?.competition.veto.votedUserIds.length === 0 ? (
          <span className="text-primary-300 text-sm">
            Looks like no one has voted their question choice!
          </span>
        ) : (
          room?.competition.veto.votedUserIds.map((userId, index) => (
            <VetoUserCardController key={index} userId={userId} />
          ))
        )}
      </div>
      <span className="text-primary-200 text-lg mt-4">Yet to vote</span>
      <div className="py-4">
        {room?.competition.veto.yetToVoteUserIds.length === 0 ? (
          <span className="text-primary-300 text-sm">
            Looks like everyone has voted!
          </span>
        ) : (
          room?.competition.veto.yetToVoteUserIds.map((userId, index) => (
            <VetoUserCardController key={index} userId={userId} />
          ))
        )}
      </div>
    </div>
  );
};

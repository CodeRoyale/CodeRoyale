import React from "react";
import { useVetoUsers } from "../../global-stores";
import { VetoUserCardController } from "./VetoUserCardController";

export const VetoPeopleController = () => {
  const vetoUsers = useVetoUsers((state) => state.vetoUsers);
  const votedUsers = useVetoUsers((state) => state.votedUsers);

  return (
    <div className="flex flex-col mt-8">
      <h1 className="text-primary-100 font-bold text-2xl">People in Veto</h1>
      <span className="text-primary-200 text-lg mt-4">Voted</span>
      <div className="py-4">
        {votedUsers.length === 0 ? (
          <span className="text-primary-300 text-sm">
            Looks like no one has voted their question choice!
          </span>
        ) : (
          votedUsers.map((user, index) => (
            <VetoUserCardController
              key={index}
              userId={user.userId}
              teamName={user.teamName}
            />
          ))
        )}
      </div>
      <span className="text-primary-200 text-lg mt-4">Yet to vote</span>
      <div className="py-4">
        {vetoUsers.length === 0 ? (
          <span className="text-primary-300 text-sm">
            Looks like everyone has voted!
          </span>
        ) : (
          vetoUsers.map((user, index) => (
            <VetoUserCardController
              key={index}
              userId={user.userId}
              teamName={user.teamName}
            />
          ))
        )}
      </div>
    </div>
  );
};

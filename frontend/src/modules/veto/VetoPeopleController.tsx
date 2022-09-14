import React from "react";
import { useVetoUsers } from "../../global-stores";
import { useUsersQuery } from "../../generated/graphql";
import { VetoUserCard } from "../../components/VetoUserCard";
// import { useRoom } from "../../global-stores";

export const VetoPeopleController = () => {
  // const room = useRoom((state) => state.room);

  const vetoUsers = useVetoUsers((state) => state.vetoUsers);
  const { data, loading } = useUsersQuery({
    variables: { userIds: vetoUsers.map((ele) => ele.userId) },
  });

  return (
    <div className="flex flex-col mt-8">
      <h1 className="text-primary-100 font-bold text-2xl">People in Veto</h1>
      <span className="text-primary-300 text-sm mt-4">Vetoed</span>
      <div className="py-4">
        {/* {!data && loading ? (
          <span className="text-primary-200">Loading...</span>
        ) : (
          data?.users.map((user, index) => {
            return (
              <VetoUserCard
                key={index}
                name={user.name}
                profilePicture={user.profilePicture}
                teamName={vetoUsers[index].teamName}
              />
            );
          })
        )} */}
      </div>
      <span className="text-primary-300 text-sm mt-4">Yet to veto</span>
      <div className="py-4">
        {!data && loading ? (
          <span className="text-primary-200">Loading...</span>
        ) : (
          data?.users.map((user, index) => {
            return (
              <VetoUserCard
                key={index}
                name={user.name}
                profilePicture={user.profilePicture}
                teamName={vetoUsers[index].teamName}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

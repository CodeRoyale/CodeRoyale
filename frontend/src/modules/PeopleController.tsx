import React, { useContext, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { Float } from "headlessui-float-react";
import { v4 as uuid } from "uuid";
import { PeopleCard } from "../components/peopleCard/PeopleCard";
import { PeopleCardMenuController } from "../components/peopleCard/PeopleCardMenuController";
import { useMeQuery, usePeopleQuery } from "../generated/graphql";
import { useRoomInvites } from "../global-stores";
import { WebSocketContext } from "./ws/WebSocketProvider";

export const PeopleController: React.FC<{}> = () => {
  const { data: meData } = useMeQuery();
  const { data: peopleData, loading: peopleLoading } = usePeopleQuery();
  const { conn } = useContext(WebSocketContext);
  const addRoomInvite = useRoomInvites((state) => state.addRoomInvite);

  const handleInvitedToRoom = (res: { by: number; to: string }) => {
    addRoomInvite({
      sender: res.by,
      receiver: meData?.me?.id!,
      invitedRoomId: res.to,
    });
  };

  useEffect(() => {
    conn?.on("invitedToRoom", handleInvitedToRoom);

    return () => {
      conn?.off("invitedToRoom", handleInvitedToRoom);
    };
  }, []);

  return (
    <div className="flex flex-col mt-8">
      <h1 className="text-primary-100 font-bold text-2xl">People</h1>
      {peopleData?.people.length === 0 ? (
        <span className="text-primary-300 text-sm mt-4">
          Currently you are not following anyone. Follow someone to see them
          here!
        </span>
      ) : (
        <span className="text-primary-300 text-sm mt-4">Online</span>
      )}
      <div className="py-4">
        {!peopleData && peopleLoading ? (
          <span className="text-primary-200">Loading...</span>
        ) : (
          peopleData?.people.map(({ id, profilePicture, username, name }) => (
            <Menu key={id}>
              <Float
                placement="right"
                offset={8}
                flip
                shift={6}
                portal
                enter="transition duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition duration-150 ease-in"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
                tailwindcssOriginClass
              >
                <Menu.Button>
                  <PeopleCard
                    key={uuid()}
                    profilePicture={profilePicture}
                    name={name}
                    online
                  />
                </Menu.Button>
                <Menu.Items className="mt-2">
                  <PeopleCardMenuController username={username} userId={id} />
                </Menu.Items>
              </Float>
            </Menu>
          ))
        )}
      </div>
    </div>
  );
};

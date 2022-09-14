import React, { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { RoomCardFooter } from "../../components/roomCard/RoomCardFooter";
import { RoomCardHeader } from "../../components/roomCard/RoomCardHeader";
import { useMeQuery, useUsersQuery } from "../../generated/graphql";
import { useChat, useRoom } from "../../global-stores";
import {
  closeRoom,
  leaveRoom,
  startCompetition,
} from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { RoomUserAvatarController } from "./RoomUserAvatarController";
import { CreateTeamController } from "./CreateTeamController";
import { RoomTeamCardController } from "./RoomTeamCardController";

export const RoomCardController: React.FC<{}> = () => {
  let benchRoomUserAvatars = null;

  const { data: meData } = useMeQuery();
  const router = useRouter();
  const { conn } = useContext(WebSocketContext);
  const room = useRoom((state) => state.room);
  const emptyChat = useChat((state) => state.emptyChat);
  const emptyUserChatIdentityColors = useChat(
    (state) => state.emptyUserChatIdentityColors
  );
  const setRoom = useRoom((state) => state.setRoom);
  const { data: usersData, loading: usersLoading } = useUsersQuery({
    variables: { userIds: room?.state.bench! },
  });
  const client = useApolloClient();

  if (usersLoading) {
  } else if (!usersData?.users) {
  } else {
    benchRoomUserAvatars = usersData?.users.map((user) => (
      <RoomUserAvatarController
        key={user.id}
        username={user.username}
        profilePicture={user.profilePicture}
      />
    ));
  }

  return (
    <>
      <div
        className="top-0 left-0 w-full relative flex flex-col bg-primary-800 rounded-md mt-8 border-b-[80px] border-primary-900"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <RoomCardHeader
          title={room?.config.title!}
          creatorUsername={room?.config.creatorUsername!}
          creatorUsernameOnClick={() =>
            router.push(`/profile/${room?.config.creatorUsername}`)
          }
        />
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700">
          {room?.state.bench.length! === 0 ? null : (
            <div
              className={`grid grid-cols-7 gap-4 items-start ${
                benchRoomUserAvatars ? "p-4" : ""
              }`}
            >
              {benchRoomUserAvatars}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl text-primary-100 font-medium">Teams</h1>
              {meData?.me?.id !== room?.config.adminUserId ? null : (
                <CreateTeamController />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 pb-4 px-4">
              {room?.teams ? (
                Object.keys(room?.teams!).length > 0 ? (
                  Object.keys(room?.teams!).map((teamName, id) => {
                    const team = room?.teams![teamName];
                    let roomTeamCardController = null;

                    if (team) {
                      roomTeamCardController = (
                        <RoomTeamCardController
                          key={id}
                          teamName={teamName}
                          canJoinTeam={!team?.includes(meData?.me?.id!)!}
                        />
                      );
                    }

                    return roomTeamCardController;
                  })
                ) : (
                  <span className="col-span-2 text-primary-300 text-sm mt-4">
                    Currently there are no teams created to join in this Room.
                    Kindly request the admin to create new teams for the
                    competition.
                  </span>
                )
              ) : null}
            </div>
          </div>
        </div>

        <RoomCardFooter
          admin={room?.config.adminUserId === meData?.me?.id}
          closeRoomOnClick={async () => {
            const response: any = await closeRoom(conn, {
              roomId: room?.config.id!,
              forceCloseRoom: false,
            });

            if (response.data) {
              setRoom(null);
              // empty chat messages and identities in state
              emptyChat();
              emptyUserChatIdentityColors();
              client.cache.evict({ fieldName: "rooms:{}" });
              router.push("/dashboard");
            }
          }}
          leaveRoomOnClick={async () => {
            const response: any = await leaveRoom(conn);

            if (response.data) {
              setRoom(null);
              // empty chat messages and identities in state
              emptyChat();
              emptyUserChatIdentityColors();
              router.push("/dashboard");
            }
          }}
          startCompetitionOnClick={async () => {
            await startCompetition(conn);
          }}
        />
      </div>
    </>
  );
};

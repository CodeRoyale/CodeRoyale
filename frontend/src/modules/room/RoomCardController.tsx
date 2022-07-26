import React, { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { RoomCardFooter } from "../../components/roomCard/RoomCardFooter";
import { RoomCardHeader } from "../../components/roomCard/RoomCardHeader";
import { useMeQuery, useUsersQuery } from "../../generated/graphql";
import { useRoom } from "../../global-stores";
import { closeRoom, leaveRoom } from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { RoomUserAvatarController } from "./RoomUserAvatarController";

export const RoomCardController: React.FC<{}> = () => {
  let benchRoomUserAvatars = null;
  // let teamRoomUserAvatars = null;

  const { data: meData } = useMeQuery();
  const router = useRouter();
  const { conn } = useContext(WebSocketContext);
  const room = useRoom((state) => state.room);
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
          <div
            className={`grid grid-cols-7 gap-4 items-start ${
              benchRoomUserAvatars ? "p-4" : ""
            }`}
          >
            {benchRoomUserAvatars}
          </div>

          <div>
            <div className="flex items-center justify-between p-4">
              <h1 className="text-lg text-primary-100 font-medium">Teams</h1>
              {meData?.me?.id !== room?.config.adminUserId ? null : (
                <Button buttonClass="primary" size="normal">
                  New Team
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 pb-4 px-4"></div>
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
              client.cache.evict({ fieldName: "rooms:{}" });
              router.push("/dashboard");
            }
          }}
          leaveRoomOnClick={async () => {
            const response: any = await leaveRoom(conn);

            if (response.data) {
              setRoom(null);
              router.push("/dashboard");
            }
          }}
        />
      </div>
    </>
  );
};

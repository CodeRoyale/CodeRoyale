import React, { useContext, useEffect } from "react";
import { Room } from "@coderoyale/common";
import { useRouter } from "next/router";
import { CurrentRoomCard } from "../../components/CurrentRoomCard";
import { useRoom } from "../../global-stores";
import { leaveRoom } from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";

export const CurrentRoomCardController: React.FC<{}> = () => {
  const { conn } = useContext(WebSocketContext);
  const router = useRouter();
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);

  const handleRoomUpdated = (res: Room) => {
    setRoom(res);
  };

  useEffect(() => {
    conn?.on("roomUpdated", handleRoomUpdated);

    return () => {
      conn?.off("roomUpdated", handleRoomUpdated);
    };
  }, []);

  return (
    <div className="mt-8">
      <CurrentRoomCard
        title={room?.config.title!}
        creatorUsername="joel"
        launchOnClick={() => router.push(`/room/${room?.config.id}`)}
        leaveRoomOnClick={async () => {
          const response: any = await leaveRoom(conn);

          if (response.data) {
            setRoom(null);
            router.push("/dashboard");
          }
        }}
      />
    </div>
  );
};

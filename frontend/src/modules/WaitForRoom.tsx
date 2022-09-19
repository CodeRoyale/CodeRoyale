import { Room } from "@coderoyale/common";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useRoom } from "../global-stores";
import { WebSocketContext } from "./ws/WebSocketProvider";

export const WaitForRoom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { conn } = useContext(WebSocketContext);
  const setRoom = useRoom((state) => state.setRoom);
  const room = useRoom((state) => state.room);
  const router = useRouter();

  let body = null;
  if (room) {
    body = children;
  }

  const handleRoomUpdated = (room: Room) => {
    console.log("roomUpdated: ", room);
    setRoom(room);
  };

  const handleVetoStopped = (room: Room) => {
    router.push(`/arena/${room.config.id}`);
    setRoom(room);
  };

  useEffect(() => {
    conn?.on("roomUpdated", handleRoomUpdated);

    return () => {
      conn?.off("roomUpdated", handleRoomUpdated);
    };
  }, []);

  useEffect(() => {
    conn?.on("vetoStopped", handleVetoStopped);

    return () => {
      conn?.off("vetoStopped", handleVetoStopped);
    };
  }, []);

  return <>{body}</>;
};

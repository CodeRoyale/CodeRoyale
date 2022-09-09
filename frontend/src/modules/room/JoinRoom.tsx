import React, { useContext, useEffect } from "react";
import { Room } from "@coderoyale/common";
import { useRouter } from "next/router";
import { useChat, useRoom } from "../../global-stores";
import { joinRoom } from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { useMeQuery } from "../../generated/graphql";
import { chatColors } from "../../utils/constants";

export const JoinRoom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { conn } = useContext(WebSocketContext);
  const { data } = useMeQuery();
  const addUserChatIdentityColor = useChat(
    (state) => state.addUserChatIdentityColor
  );
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);

  let body = null;

  useEffect(() => {
    const joinRoomFunction = async () => {
      if (!room && conn) {
        try {
          const result: any = await joinRoom(conn, router.query.id as string);
          if (result.data) {
            setRoom(result.data);
            // setting chat identities for the users in room
            // generating a random number from 1 to 10
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            addUserChatIdentityColor(data?.me?.id!, chatColors[randomNumber]);
          }
        } catch (error) {
          console.log(error);
          // show toast and push to /dashboard
          router.push("/dashboard");
        }
      }
    };

    joinRoomFunction();
  }, []);

  const handleRoomUpdated = (room: Room) => {
    setRoom(room);
  };

  const handleUserJoinedRoom = (res: { joineeUserId: number }) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    addUserChatIdentityColor(res.joineeUserId, chatColors[randomNumber]);
  };

  const handleRoomClosed = () => {
    setRoom(null);
    router.push("/dashboard");
  };

  useEffect(() => {
    conn?.on("roomUpdated", handleRoomUpdated);

    return () => {
      conn?.off("roomUpdated", handleRoomUpdated);
    };
  }, []);

  useEffect(() => {
    conn?.on("userJoinedRoom", handleUserJoinedRoom);

    return () => {
      conn?.off("userJoinedRoom", handleUserJoinedRoom);
    };
  }, []);

  useEffect(() => {
    conn?.on("roomClosed", handleRoomClosed);

    return () => {
      conn?.off("roomClosed", handleRoomClosed);
    };
  }, []);

  if (room) {
    body = children;
  }

  return <>{body}</>;
};

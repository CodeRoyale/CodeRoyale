import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRoom } from "../../global-stores";
import { Room } from "../../types/types";

export type ISocket = Socket | null;

// initial value of socket in context will be null
export const WebSocketContext = React.createContext<{
  conn: ISocket;
  setConn: (socket: ISocket) => void;
}>({ conn: null, setConn: () => {} });

interface WebSocketProviderProps {
  children: React.ReactNode;
  shouldConnect: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  let socket: ISocket = null;

  const setRoom = useRoom((state) => state.setRoom);
  const router = useRouter();

  const [conn, setConn] = useState<ISocket>(null);
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!socket && !conn && shouldConnect && !isConnecting.current) {
      isConnecting.current = true;
      socket = io(process.env.NEXT_PUBLIC_LOBBY_URL as string, {
        withCredentials: true,
        forceNew: true,
      });

      socket.on("connect", () => {
        isConnecting.current = false;
        setConn(socket);
      });

      // get the room that user is part of
      socket
        .off("get_room_after_connect")
        .on("get_room_after_connect", (room: Room) => {
          console.log("room from lobby: ", room);
          setRoom(room);
          // push to veto page since veto is going on
          if (room.competition.veto.isOngoing) {
            router.push(`/veto/${room.config.id}`);
          }

          // push to veto page since veto is going on
          if (room.competition.isOngoing) {
            router.push(`/arena/${room.config.id}`);
          }
        });

      socket.on("connect_error", (err) => {
        isConnecting.current = false;
        setConn(null);
      });
    }

    return () => {
      socket?.off("connect");
      socket?.off("connect_error");
    };
  }, [socket, conn, shouldConnect]);

  return (
    <WebSocketContext.Provider value={{ conn, setConn }}>
      {children}
    </WebSocketContext.Provider>
  );
};

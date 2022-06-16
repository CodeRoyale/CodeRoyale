import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type ISocket = Socket | null;

// initial value of socket in context will be null
export const WebSocketContext = React.createContext<ISocket>(null);

interface WebSocketProviderProps {
  children: React.ReactNode;
  shouldConnect: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  let socket: ISocket = null;

  const [conn, setConn] = useState<ISocket>(null);

  useEffect(() => {
    if (!socket && !conn && shouldConnect) {
      socket = io(process.env.NEXT_PUBLIC_LOBBY_URL as string, {
        withCredentials: true,
      });

      socket.on('connect', () => {
        setConn(socket);
      });

      socket.on('connect_error', (err) => {
        setConn(null);
      });
    }
  }, [socket, conn, shouldConnect]);

  return (
    <WebSocketContext.Provider value={conn}>
      {children}
    </WebSocketContext.Provider>
  );
};

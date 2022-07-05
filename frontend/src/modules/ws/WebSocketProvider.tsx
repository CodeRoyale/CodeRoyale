import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

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

  const [conn, setConn] = useState<ISocket>(null);
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!socket && !conn && shouldConnect && !isConnecting.current) {
      isConnecting.current = true;
      socket = io(process.env.NEXT_PUBLIC_LOBBY_URL as string, {
        withCredentials: true,
        forceNew: true,
      });

      socket.on('connect', () => {
        isConnecting.current = false;
        setConn(socket);
      });

      socket.on('connect_error', (err) => {
        isConnecting.current = false;
        setConn(null);
      });
    }

    return () => {
      socket?.off('connect');
      socket?.off('connect_error');
    };
  }, [socket, conn, shouldConnect]);

  return (
    <WebSocketContext.Provider value={{ conn, setConn }}>
      {children}
    </WebSocketContext.Provider>
  );
};

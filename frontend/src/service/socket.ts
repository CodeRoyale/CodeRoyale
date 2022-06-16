import { io, Socket } from 'socket.io-client';

type CallBackType = (
  error: {} | null,
  success: { message: string; socket?: Socket } | null
) => void;

export const socketConnection = (callback: CallBackType) => {
  const socket = io(process.env.NEXT_PUBLIC_LOBBY_URL as string, {
    withCredentials: true,
  });

  if (!socket) return false;

  if (socket) {
    socket.on('connect', () => {
      console.log('connection accepted');
    });

    socket.on('connect_error', (err) => {
      console.log(err.message);
    });
  }
};

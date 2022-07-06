import { Server, Socket } from "socket.io";
import { CREATE_ROOM } from "../socketActions/userActions";
import Redis from "ioredis";
import { createRoom } from "./roomController/createRoom";

export interface DataFromServerInterface {
  socket: Socket;
  io?: Server;
  currentUserId: number;
  redis?: Redis;
}

const genericActionCreater =
  (
    actionResponder: any,
    dataFromServer: DataFromServerInterface,
    asynFunc: boolean = false,
    failReply: string = "Some error occured!"
  ) =>
  (dataFromClient: any, callback: (data: any) => void) => {
    // if user didnt pass anything
    if (!dataFromClient) dataFromClient = {};

    let data;
    if (!asynFunc) {
      data = actionResponder(dataFromClient, dataFromServer) || failReply;
      console.log(data);
      if (callback) callback(data);
    } else {
      actionResponder(dataFromClient, dataFromServer)
        .then((tempData: any) => {
          if (callback) callback(tempData);
        })
        .catch((err: any) => {
          console.log(err);
          if (callback) callback(err.message);
        });
    }
  };

export const handleUserEvents = (args: DataFromServerInterface) => {
  const { socket, redis, currentUserId } = args;

  socket.on(
    CREATE_ROOM,
    genericActionCreater(createRoom, { socket, currentUserId, redis }, true)
  );
};

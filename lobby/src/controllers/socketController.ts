import { DataFromServer } from "src/types/types";
import {
  CLOSE_ROOM,
  CREATE_ROOM,
  CREATE_TEAM,
  DELETE_TEAM,
  INVITE_TO_ROOM,
  JOIN_ROOM,
  JOIN_TEAM,
  LEAVE_ROOM,
  LEAVE_TEAM,
  SEND_CHAT_MSG,
} from "../socketActions/userActions";
import { createRoom, inviteToRoom, joinRoom } from "./roomController/";
import { chat } from "./roomController/chat";
import { closeRoom } from "./roomController/closeRoom";
import { createTeam } from "./roomController/createTeam";
import { deleteTeam } from "./roomController/deleteTeam";
import { getRoom } from "./roomController/getRoom";
import { joinTeam } from "./roomController/joinTeam";
import { leaveRoom } from "./roomController/leaveRoom";
import { leaveTeam } from "./roomController/leaveTeam";
import { deleteUser, getUser, updateUser } from "./userController";

const genericActionCreater =
  (
    actionResponder: any,
    dataFromServer: DataFromServer,
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

export const handleUserEvents = (args: DataFromServer) => {
  const { io, socket, redis, currentUserId } = args;

  socket.on(
    CREATE_ROOM,
    genericActionCreater(createRoom, { socket, currentUserId, redis }, true)
  );

  socket.on(
    INVITE_TO_ROOM,
    genericActionCreater(
      inviteToRoom,
      { socket, io, currentUserId, redis },
      true
    )
  );

  socket.on(
    JOIN_ROOM,
    genericActionCreater(joinRoom, { socket, currentUserId, redis }, true)
  );

  socket.on(
    CLOSE_ROOM,
    genericActionCreater(closeRoom, { socket, currentUserId, redis }, true)
  );

  socket.on(
    LEAVE_ROOM,
    genericActionCreater(leaveRoom, { socket, currentUserId, redis }, true)
  );

  socket.on(
    CREATE_TEAM,
    genericActionCreater(createTeam, { socket, currentUserId, redis }, true)
  );

  socket.on(
    JOIN_TEAM,
    genericActionCreater(joinTeam, { socket, currentUserId, redis }, true)
  );

  socket.on(
    LEAVE_TEAM,
    genericActionCreater(leaveTeam, { socket, currentUserId, redis }, true)
  );

  socket.on(
    SEND_CHAT_MSG,
    genericActionCreater(chat, { socket, currentUserId, redis }, true)
  );

  socket.on(
    DELETE_TEAM,
    genericActionCreater(deleteTeam, { socket, currentUserId, redis }, true)
  );

  socket.on("disconnect", async () => {
    const user = await getUser(currentUserId, redis!);
    // user is not in an active room so remove the user from cache
    if (!user?.currentRoom) {
      // delete the user from cache since user is not in any room
      const result = await deleteUser(currentUserId, redis!);

      if (result) {
        console.log(`userId:${currentUserId} disconnected`);
      }
    } else {
      const room = await getRoom(user.currentRoom, redis!);
      // remove user from cache only if room they are currently part of has not started veto or the competition
      if (!room?.competition.veto.isOngoing && !room?.competition.isOngoing) {
        // make user leave the room they are part of
        await leaveRoom({}, { socket, currentUserId, redis });
        // delete the user from cache
        const result = await deleteUser(currentUserId, redis!);

        if (result) {
          console.log(`userId:${currentUserId} disconnected`);
        }
      } else {
        user.hasActiveConnection = false;
        await updateUser(user, redis!);
        console.log(`userId:${currentUserId} has disconnected temporarily`);
      }
    }
  });
};

import { DataFromServer } from "src/types/types";
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

export const handleUserEvents = (args: DataFromServer) => {
  const { io, socket, redis, currentUserId } = args;

  socket.on("createRoom", async (dataFromClient, callback) => {
    const response = await createRoom(dataFromClient, {
      socket,
      redis,
      currentUserId,
    });
    callback(response);
  });

  socket.on("inviteToRoom", async (dataFromClient, callback) => {
    const response = await inviteToRoom(dataFromClient, {
      socket,
      io,
      currentUserId,
      redis,
    });
    callback(response);
  });

  socket.on("joinRoom", async (dataFromClient, callback) => {
    const response = await joinRoom(dataFromClient, {
      socket,
      currentUserId,
      redis,
    });
    callback(response);
  });

  socket.on("closeRoom", async (dataFromClient, callback) => {
    const response = await closeRoom(dataFromClient, {
      socket,
      currentUserId,
      redis,
    });

    callback(response);
  });

  socket.on("leaveRoom", async (callback) => {
    const response = await leaveRoom({
      socket,
      currentUserId,
      redis,
    });

    callback(response);
  });

  socket.on("createTeam", async (dataFromClient, callback) => {
    const response = await createTeam(dataFromClient, {
      socket,
      currentUserId,
      redis,
    });

    callback(response);
  });

  socket.on("joinTeam", async (dataFromClient, callback) => {
    const response = await joinTeam(dataFromClient, {
      socket,
      currentUserId,
      redis,
    });

    callback(response);
  });

  socket.on("leaveTeam", async (callback) => {
    const response = await leaveTeam({ socket, currentUserId, redis });

    callback(response);
  });

  socket.on("deleteTeam", async (dataFromClient, callback) => {
    const response = await deleteTeam(dataFromClient, {
      socket,
      currentUserId,
      redis,
    });

    callback(response);
  });

  socket.on("sendChatMessage", async (dataFromClient, callback) => {
    const response = await chat(dataFromClient, {
      socket,
      currentUserId,
      redis,
    });

    callback(response);
  });

  // socket.on(
  //   "START_COMPETITION",
  //   genericActionCreater(
  //     startCompetition,
  //     { socket, currentUserId, redis },
  //     true
  //   )
  // );

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
        await leaveRoom({ socket, currentUserId, redis });
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

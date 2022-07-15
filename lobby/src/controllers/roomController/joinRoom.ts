import { ROOM_PREFIX } from "../../utils/constants";
import { DataFromServer, Room } from "../../types/types";
import { getUser, updateUser } from "../userController";
import { JOINED_ROOM, ROOM_UPDATED } from "../../socketActions/serverActions";

export const joinRoom = async (
    roomId: string,
    { socket, redis, currentUserId }: DataFromServer
) => {
    const getUserResult = await getUser(currentUserId, redis!);
    const user = getUserResult.data;
    const roomResult = await redis?.get(ROOM_PREFIX + roomId);
    let room: Room;

    if (roomResult) {
        room = JSON.parse(roomResult);
    } else {
        return false;
    }

    // (only run if room doesn't exists) and (user is allowed if private) and (space is there)
    //! privateList needs to be added
    if (
        !room &&
        !room['config']['private']  &&
        room['state']['currMemberCount'] > room['config']['maxMembers']
    ) {
        return { status: 0, error: "The User doesn't meet the specifications" };
    }

    // User is already in a different room do not allow
    if (user?.userId) {
        return { status: 1, error: 'User already in room' };
    }

    room.state.currMemberCount += 1;
    await redis?.set(ROOM_PREFIX + roomId, JSON.stringify(room));

    await updateUser(user!, redis!);

    socket.join(roomId);
    socket.to(roomId).emit(ROOM_UPDATED, {
      type: JOINED_ROOM,
      data: { currentUserId },
    });
    console.log(`userId:${currentUserId} joined from ${roomId}`);
    return room;
    
}; 
    
    

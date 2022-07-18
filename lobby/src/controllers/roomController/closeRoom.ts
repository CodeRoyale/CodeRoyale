import { CLOSED_ROOM } from "../../socketActions/serverActions";
import { ControllerResponse, DataFromServer, Room } from "src/types/types";
import { ROOM_PREFIX } from "src/utils/constants";
import { ROOM_UPDATED } from "src/socketActions/serverActions";
import { deleteUser, updateUser } from "../userController";

export const closeRoom = async (roomId: string, forceCloseRoom: boolean , { socket, redis, currentUserId }: DataFromServer): Promise<ControllerResponse<Room>> => {
    const roomResult = await redis?.get(ROOM_PREFIX + roomId);
    let room: Room;

    if (roomResult) {
        room = JSON.parse(roomResult);
    } else {
        return { error: `Room with roomId:${roomId} does not exist` };
    }

    
     if (!roomId || room.config.adminUserId !== currentUserId) {
        return { error: 'Only admin can do this' };
    }
    
    if (
        !forceCloseRoom &&
        (room.competition.isOngoing || room.competition.veto.isOngoing)
      ) {
        return {
          error: 'There is a ongoing competition. Finish it first',
        };
    }
    
    // everyone from room bench
    const allMemberIds = room.state.bench;
    
    //from all teams
    Object.keys(room.teams).forEach((teamName) => {
        room.teams[teamName].forEach((memberId) => {
            allMemberIds.push(memberId);
        });
    });

    allMemberIds.forEach(async(userId) => {
        await deleteUser(userId, redis!);
    })

    await redis?.del(ROOM_PREFIX + roomId);

    socket.to(roomId).emit(ROOM_UPDATED, {
        type: CLOSED_ROOM,
        data: true,
      });
    socket.emit(CLOSED_ROOM);
    console.log(`userId:${currentUserId} closed the room ${roomId}`);
    return { data: room }
};
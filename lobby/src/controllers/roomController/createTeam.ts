import { ROOM_UPDATED, TEAM_CREATED } from "../../socketActions/serverActions";
import { ControllerResponse, DataFromServer, Room } from "../../types/types";
import { ROOM_PREFIX } from "../../utils/constants";
import { getUser } from "../userController"

export const createTeam = async ( teamName: string,
    { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
    const user = await getUser(currentUserId, redis!);
    if (!user) {
        return { error: "User who tried to create the team does not exist!" };
    }

    const roomResult = await redis?.get(ROOM_PREFIX + user.currentRoom);
    let room: Room;

    if (roomResult) {
        room = JSON.parse(roomResult);
    } else {
        return { error: `Room with roomId:${user.currentRoom} does not exist` };
    }

    // If user not in room or is not admin of the room
    if (!user.currentRoom || room.config.adminUserId !== currentUserId) {
        return { error: 'Only admin can do this' };
    }
    
    // If teams in room exceed the max team limit
    // If team is already created before
    if (Object.keys(room.teams).length > room.config.maxTeams && room.teams[teamName]) {
        return { error: 'The team name has already been alloted or the team is already in' };
    }

    room.teams[teamName] = [];
    await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));

    socket.to(user.currentRoom).emit(ROOM_UPDATED, {
        type: TEAM_CREATED,
        data: { teamName }
    });

    return { data: room };

}
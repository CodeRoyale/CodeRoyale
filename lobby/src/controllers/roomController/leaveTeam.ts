import { ControllerResponse, DataFromServer, Room } from "src/types/types";
import { getUser, updateUser } from "../userController";
import { ROOM_PREFIX } from "../../utils/constants";
import { LEFT_TEAM, ROOM_UPDATED } from "src/socketActions/serverActions";

export const leaveTeam = async(roomId: string, {socket, redis, currentUserId}: DataFromServer): Promise<ControllerResponse<Room>> => {
    const user = await getUser(currentUserId, redis!);
    if (!user) {
        return { error: "User who tried to join the room does not exist" };
    }
    
    const roomResult = await redis?.get(ROOM_PREFIX + user.currentRoom);
    let room: Room;

    if (roomResult) {
        room = JSON.parse(roomResult);
    } else {
        return { error: `Room with roomId:${user.currentRoom} does not exist` };
    }

    // Check if in a room and in a team
    if (!user.currentRoom && !user.currentTeam) {
        return {
            error: 'User does not meet the specifications to leave the team',
        };
    }

    // filteredTeam implies the team without the current user who left the team
    const filteredTeam = room.teams[user.currentTeam!].filter(
        (element) => element !== currentUserId
    );

    room.teams[user.currentTeam!] = filteredTeam;
    room.state.bench.push(currentUserId);
    await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));
    
    // emptying the currentTeam for the user
    user.currentTeam = '';
    await updateUser(user, redis!);

    socket.leave(`${user.currentRoom}/${user.currentTeam}`);
    socket.to(roomId).emit(ROOM_UPDATED, {
        type: LEFT_TEAM,
        data: room,
    });


    return { data: room };
}
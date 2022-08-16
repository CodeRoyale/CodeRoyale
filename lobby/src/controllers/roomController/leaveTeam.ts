import { ControllerResponse, DataFromServer } from "../../types/types";
import { getUser, updateUser } from "../userController";
import { ROOM_PREFIX } from "../../utils/constants";
import { LEFT_TEAM, ROOM_UPDATED } from "../../socketActions/serverActions";
import { getRoom } from "./getRoom";

export const leaveTeam = async({socket, redis, currentUserId}: DataFromServer): Promise<ControllerResponse<boolean>> => {
    const user = await getUser(currentUserId, redis!);
    if (!user) {
        return { error: "User who tried to join the room does not exist" };
    }
    const room = await getRoom(user.currentRoom!, redis!);

    // Check if in a room and in a team
    if (!user.currentRoom && !user.currentTeam) {
        return {
            error: 'User does not meet the specifications to leave the team',
        };
    }

    // filteredTeam implies the team without the current user who left the team
    const filteredTeam = room!.teams[user.currentTeam!].filter(
        (element) => element !== currentUserId
    );

    room!.teams[user.currentTeam!] = filteredTeam;
    room!.state.bench.push(currentUserId);
    await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));
    
    // emptying the currentTeam for the user
    user.currentTeam = '';
    await updateUser(user, redis!);

    socket.leave(`${user.currentRoom}/${user.currentTeam}`);
    socket.to(user.currentRoom!).emit(ROOM_UPDATED, {
        type: LEFT_TEAM,
        data: room,
    });


    return { data: true };
}
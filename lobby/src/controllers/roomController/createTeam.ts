import { Room } from "src/types/types";
import { ROOM_PREFIX } from "src/utils/constants";
import { getUser } from "../userController"

export const createTeam = async (
    roomId: string,
    { socket, redis, currentUserId }: DataFromServer
) => {
    const user = await getUser(currentUserId, redis!);
    if (!user) {
        return { error: "User who tried to close the room does not exist!" };
    }

    const roomResult = await redis?.get(ROOM_PREFIX + roomId);
    let room: Room;

    if (roomResult) {
        room = JSON.parse(roomResult);
    } else {
        return false;
    }

    // If user not in room or is not admin of the room
    if (!roomId || room.config.adminUserId !== currentUserId) {
        return { status: 0, error: 'Only admin can do this' };
    }

}
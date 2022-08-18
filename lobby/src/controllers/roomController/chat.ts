import { RCV_MSG } from "../../socketActions/serverActions";
import { ControllerResponse, DataFromServer } from "../../types/types";
import { getUser } from "../userController";
import { getRoom } from "./getRoom";

export const chat = async (message: string, toTeam: string, { socket, redis, currentUserId }: DataFromServer): Promise<ControllerResponse<boolean>> => {
    const user = await getUser(currentUserId, redis!);
    if (!user) {
        return { error: "User who tried to chat in room doesn't exist" };
    }

    const room = await getRoom(user.currentRoom!, redis!);
    if (!room) {
        return { error: `Room with roomId:${user.currentRoom} does not exist` };
    }

    if (!message) return { data: false };
    // todo: change the variable name of 'rcvrs'
    let rcvrs = user.currentRoom;

    if (toTeam && user.currentTeam) {
        rcvrs += `/${user.currentTeam}`;
    }

    socket.to(rcvrs!).emit(RCV_MSG, { message, toTeam });
    return { data: true };
}
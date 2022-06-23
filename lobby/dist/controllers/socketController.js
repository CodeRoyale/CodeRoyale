"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserEvents = void 0;
const userActions_1 = require("../socketActions/userActions");
const roomController_1 = require("./roomController");
const genericActionCreater = (actionResponder, dataFromServer, asynFunc = false, failReply = "Some error occured!") => (dataFromClient, callback) => {
    if (!dataFromClient)
        dataFromClient = {};
    let data;
    if (!asynFunc) {
        data = actionResponder(dataFromClient, dataFromServer) || failReply;
        console.log(data);
        if (callback)
            callback(data);
    }
    else {
        actionResponder(dataFromClient, dataFromServer)
            .then((tempData) => {
            if (callback)
                callback(tempData);
        })
            .catch((err) => {
            console.log(err);
            if (callback)
                callback(err.message);
        });
    }
};
const handleUserEvents = (args) => {
    const { socket, redis, currentUserId } = args;
    socket.on(userActions_1.CREATE_ROOM, genericActionCreater(roomController_1.createRoom, { socket, currentUserId, redis }, true));
    socket.on("disconnect", () => {
    });
};
exports.handleUserEvents = handleUserEvents;
//# sourceMappingURL=socketController.js.map
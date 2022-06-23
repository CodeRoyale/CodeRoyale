"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const updateUser = async (updatedUser) => {
    try {
        const users = await usersRedis.getUsersStore();
        users[updatedUser.userName] = Object.assign(Object.assign({}, users[updatedUser.userName]), updatedUser);
        await usersRedis.updateUsersStore(users);
        return { status: 1, userObj: users[updatedUser.userName] };
    }
    catch (error) {
        console.log(error);
        return { status: 0, error: error.message };
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map
const UserModel = require('../models/user');

// [userID] : {     }

// all details related to a user connected to socket will be stored here

const addUser = (userName, socket_id, profilePicture, rank = 10) => {
	const returnObj = UserModel.addUser({
		userName,
		socket_id,
		// room_id,
		// team_name,
		rank,
		profilePicture,
	});
	if (returnObj.status === 0) {
		console.log(returnObj.error);
		return false;
	}
	if (returnObj.status === 1) {
		return returnObj.userObj;
	}
	return returnObj.userObj;
};

// const removeUser = (userName) => {
// 	try {
// 		if (users[userName]) {
// 			console.log(userName + ' removed');
// 			delete users[userName];
// 			return true;
// 		}
// 		return false;
// 	} catch (err) {
// 		return err.message || false;
// 	}
// };

// this is just for extra checking
// can change room_id and team_name

const updateUser = (updatedUser) => {
	//TODO if wala karna hai!
	const check = [
		'userName',
		'socket_id',
		'room_id',
		'team_name',
		'rank',
		'profilePicture',
	];
	let newUpdatedUser = Object.keys(updatedUser).filter((ele) =>
		check.includes(ele)
	);
	const returnObj = UserModel.updateUser(newUpdatedUser);
	return returnObj.userObj;
};

const getUser = (userName) => {
	const returnObj = UserModel.getUser(userName);
	if (returnObj.status === 0) {
		return returnObj.error;
	}
	return returnObj.userObj;
};

const getUserData = () => {
	// need proper authorizations
	const returnObj = UserModel.getUserData();
	if (returnObj.status === 0) {
		return returnObj.error;
	}
	return returnObj.userObj;
};

module.exports = {
	addUser,
	getUserData,
	getUser,
	updateUser,
};

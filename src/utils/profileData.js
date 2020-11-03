import jwt from 'jsonwebtoken';

const token = localStorage.token;
let profileData;

// If token found in localStorage decode to get user info
if (token) {
  profileData = jwt.decode(token);
} else {
  profileData = {
    email: 'coderoyaleuser@email.com',
    firstName: 'CodeRoyale',
    lastName: 'User',
    picture: 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg',
    userName: 'coderoyaleuser',
  };
}

export default profileData;

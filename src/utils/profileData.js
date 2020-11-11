import jwt from 'jsonwebtoken';

const profileData = () => {
  const token = localStorage.token;
  let user;

  // If token found in localStorage decode to get user info
  if (token) {
    user = jwt.decode(token);
  } else {
    user = {
      email: 'coderoyaleuser@email.com',
      firstName: 'CodeRoyale',
      lastName: 'User',
      picture: 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg',
      userName: 'coderoyaleuser',
    };
  }

  return user;
};

export default profileData;

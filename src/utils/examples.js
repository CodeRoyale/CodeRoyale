let userApiData = localStorage.getItem('user-data');
userApiData = JSON.parse(userApiData);

let profileData = {
  imageUrl: userApiData.picture,
  username: userApiData.userName,
  email: 'sawarni99@gmail.com',
};
export default profileData;

let userApiData = localStorage.getItem('user-data');
userApiData = JSON.parse(userApiData);
let profileData;

if (userApiData !== null) {
  profileData = {
    imageUrl: userApiData.picture,
    username: userApiData.userName,
    email: 'sawarni99@gmail.com',
  };
} else {
  profileData = {
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQHuIxezqseoGQ/profile-displayphoto-shrink_200_200/0?e=1600905600&v=beta&t=RWNCY_VThJLkPpUN9-529erEFlZREIhqlMLGDB8bBSU',
    username: Date.now(),
    email: 'sawarni99@gmail.com',
  };
}
export default profileData;

/* 
  - Contains all routes
  - Contains need auth or not for each route
*/
const routes = [
  {
    path: '/sorry',
    component: 'OutroMain',
    title: 'Sorry',
    needsAuth: false,
  },
  {
    path: '/dashboard',
    component: 'DashboardMain',
    title: 'Dashboard | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/login',
    component: 'LoginMain',
    title: 'Login | CodeRoyale',
    needsAuth: false,
  },
  {
    path: '/signup',
    component: 'SignUpMain',
    title: 'Signup | CodeRoyale',
    needsAuth: false,
  },
  {
    path: '/arena',
    component: 'Arena',
    title: 'Arena | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/lobby',
    component: 'LobbyMain',
    title: 'Lobby | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/scoreboard',
    component: 'ScoreboardMain',
    title: 'Scoreboard | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/room',
    component: 'RoomMain',
    title: 'Room | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/veto',
    component: 'VetoMain',
    title: 'Veto | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/settings',
    component: 'SettingsMain',
    title: 'Settings | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/test',
    component: 'TestPage',
    title: 'Test | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '',
    component: 'HomeMain',
    title: 'CodeRoyale',
    needsAuth: false,
  },
  {
    path: '/',
    component: 'HomeMain',
    title: 'CodeRoyale',
    needsAuth: false,
  },
];

export default routes;

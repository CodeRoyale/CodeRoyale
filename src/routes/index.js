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
    title: 'Dashboard',
    needsAuth: true,
  },
  {
    path: '/login',
    component: 'LoginMain',
    title: 'Login',
    needsAuth: false,
  },
  {
    path: '/signup',
    component: 'SignUpMain',
    title: 'Signup',
    needsAuth: false,
  },
  {
    path: '/arena',
    component: 'Arena',
    title: 'Arena',
    needsAuth: true,
  },
  {
    path: '/lobby',
    component: 'LobbyMain',
    title: 'Lobby',
    needsAuth: true,
  },
  {
    path: '/results',
    component: 'WinLoseMain',
    title: 'Scoreboard',
    needsAuth: true,
  },
  {
    path: '/room',
    component: 'RoomMain',
    title: 'Room',
    needsAuth: true,
  },
  {
    path: '/veto',
    component: 'VetoMain',
    title: 'Veto',
    needsAuth: true,
  },
  {
    path: '/settings',
    component: 'SettingsMain',
    title: 'Profile Settings',
    needsAuth: true,
  },
  {
    path: '/test',
    component: 'TestPage',
    title: 'Test',
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

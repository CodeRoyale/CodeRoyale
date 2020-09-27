const routes = [
  {
    path: '/sorry',
    component: 'OutroMain',
    title: 'Sorry',
  },
  {
    path: '/dashboard',
    component: 'DashboardMain',
    title: 'Dashboard',
  },
  {
    path: '/login',
    component: 'LoginMain',
    title: 'Login',
  },
  {
    path: '/signup',
    component: 'SignUpMain',
    title: 'Signup',
  },
  {
    path: '/arena',
    component: 'Arena',
    title: 'Arena',
  },
  {
    path: '/lobby',
    component: 'LobbyMain',
    title: 'Lobby',
  },
  {
    path: '/results',
    component: 'WinLoseMain',
    title: 'Scoreboard',
  },
  {
    path: '/room',
    component: 'RoomMain',
    title: 'Room',
  },
  {
    path: '/veto',
    component: 'VetoMain',
    title: 'Veto',
  },
  {
    path: '/settings',
    component: 'ProfileSettingsMain',
    title: 'Profile Settings',
  },
  {
    path: '',
    component: 'FrontPageMain',
    title: 'CodeRoyale',
  },
  {
    path: '/',
    component: 'FrontPageMain',
    title: 'CodeRoyale',
  },
];

export default routes;

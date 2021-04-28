/* 
  - Contains all routes
  - Contains need auth or not for each route
*/
const routes = [
  {
    path: '/dashboard',
    component: 'Dashboard',
    title: 'Dashboard | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/login',
    component: 'Login',
    title: 'Login | CodeRoyale',
    needsAuth: false,
  },
  {
    path: '/signup',
    component: 'SignUp',
    title: 'Signup | CodeRoyale',
    needsAuth: false,
  },
  {
    path: '/room',
    component: 'Room',
    title: 'Room | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/veto',
    component: 'Veto',
    title: 'Veto | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/arena',
    component: 'Arena',
    title: 'Arena | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/scoreboard',
    component: 'Scoreboard',
    title: 'Scoreboard | CodeRoyale',
    needsAuth: true,
  },
  {
    path: '/settings',
    component: 'Settings',
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
    component: 'Home',
    title: 'CodeRoyale',
    needsAuth: false,
  },
  {
    path: '/',
    component: 'Home',
    title: 'CodeRoyale',
    needsAuth: false,
  },
];

export default routes;

import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import CoachesList from './pages/coaches/CoachesList';

const CoachRegistration = () => import('./pages/coaches/CoachRegistration');
const CoachDetail = () => import('./pages/coaches/CoachDetail');
const Contact = () => import('./pages/requests/ContactCoach');
const Requests = () => import('./pages/requests/CoachRequests');
const UserAuth = () => import('./pages/auth/UserAuth');
const NotFound = () => import('./pages/NotFound');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [{ path: 'contact', props: true, component: Contact }],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requireAuth: true },
    },
    { path: '/requests', component: Requests, meta: { requireAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requireNotAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requireNotAuth && store.getters.isAuth) {
    next('/coaches');
  }

  next();
});

export default router;

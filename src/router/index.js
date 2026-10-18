import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', meta: { section: 'feed' }, component: () => import('../views/FeedView.vue') },
    {
      path: '/stories/:id',
      meta: { section: 'detail' },
      component: () => import('../views/StoryView.vue'),
    },
    {
      path: '/profile',
      meta: { section: 'profile' },
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/saved',
      meta: { section: 'profile' },
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/creators/:id',
      meta: { section: 'profile' },
      component: () => import('../views/ProfileView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

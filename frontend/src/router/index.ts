import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/employee/:employeeId',
      name: 'employee',
      component: () => import('../views/EmployeeView.vue'),
      redirect: (to) => ({
        name: 'employee-suggestions',
        params: { employeeId: to.params.employeeId },
      }),
      children: [
        {
          path: 'suggestions',
          name: 'employee-suggestions',
          component: () => import('../views/EmployeeSuggestions.vue'),
        },
        {
          path: 'about',
          name: 'employee-about',
          component: () => import('../views/EmployeeAbout.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router

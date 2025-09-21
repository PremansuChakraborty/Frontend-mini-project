import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/user', component: () => import('../components/User.vue') },
  { path: '/payment', component: () => import('../components/Payment.vue') },
  { path: '/edit-user/:userId', component: () => import('../components/EditUser.vue'), meta: { requiresAuth: true } },
  { path: '/edit-payment/:paymentId', component: () => import('../components/EditPayment.vue'), meta: { requiresAuth: true } },
  { path: '/', component: () => import('../components/Reports.vue') },
  { path: '/admin-login', component: () => import('../components/AdminLogin.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router

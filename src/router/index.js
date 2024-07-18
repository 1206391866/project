import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

// component: () => import('../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }, {
      path: '/home',
      name: 'home',
      component:Home  //第二种写法
    }, {
      path: '/my',
      name: 'my',
      component: () => import('../views/My.vue')
    }, {
      path: '/trader',
      name: 'trader',
      component: () => import('../views/Trader.vue')
    }, {
      path: '/tradelist',
      name: 'tradelist',
      component: () => import('../views/TradeList.vue')
    }, {
      path: '/payeeList',
      name: 'payeeList',
      component: () => import('../views/PayeeList.vue')
    }, {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    }, {
      path: '/deposit',
      name: 'deposit',
      component: () => import('../views/Deposit.vue')
    }, {
      path:'/',
      redirect:'/login'
    }, {
      path:'/addPayee',
      name:'addPayee',
      component: () => import('../views/AddPayee.vue')
    }
  ]
})

export default router

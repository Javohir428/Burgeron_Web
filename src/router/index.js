import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import OrderScan from '@/components/OrderScan'

import firebase from 'firebase'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '*',
        component: OrderScan,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/',
        component: OrderScan,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/login',
        name: 'login',  
        component: Login,
      },
      {
        path: '/order-scan',
        name: 'OrderScan',
        component: OrderScan,
        meta: {
          requiresAuth: true
        }
      }
]
});


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.getCurrentUser()){
    next('login');
  }else{
    next();
  }
});

export default router

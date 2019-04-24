import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Pomp from '@/components/Pomp'
import Tankstration from '@/components/Tankstation'
import Administratie from '@/components/Shell/Administratie'
import Coupon from '@/components/Shell/Coupon'
import Geschiedenis from '@/components/Shell/Geschiedenis'
import factor2 from '@/components/twofactorpage.vue'

Vue.use(Router)
export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/pomp', component: Pomp },
    { path: '/tankstation', component: Tankstration },
    { path: '/administratie', component: Administratie },
    { path: '/coupon', component: Coupon },
    { path: '/geschiedenis', component: Geschiedenis },
    { path: '/2factor', component: factor2 },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '@/views/Intro.vue'
import Movies from '@/views/Movies.vue'
import Login from '@/views/Login.vue'
import Mypage from '@/views/Mypage.vue'
import Community from '@/views/Community.vue'
import ReviewDetail from '@/views/ReviewDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  
  {
    path:'/mypage/:username',
    name:'Mypage',
    component: Mypage,
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/community/:detail',
    name: 'ReviewDetail',
    component: ReviewDetail
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


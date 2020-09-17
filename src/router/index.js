import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ColorList from '@/views/ColorList.vue'
import ColorFinder from '@/views/ColorFinder.vue'
import ColorFinder2 from '@/views/ColorFinder2.vue'
import Private from '@/views/Private.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/color_list/:id',
    name: 'color_list',
    component: ColorList
  },
  {
    path: '/color_finder',
    name: 'color_finder',
    component: ColorFinder
  },
  {
    path: '/color_finder/:RGB',
    name: 'color_finder2',
    component: ColorFinder2
  },
  {
    path: '/private',
    name: 'Private',
    component: Private
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

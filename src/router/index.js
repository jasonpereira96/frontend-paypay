import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AdminHome.vue')
  },
  {
    path: '/admin/employee/:id',
    name: 'ViewEmployee',
    meta: {
      isViewMode: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewEmployee.vue')
  },
  {
    path: '/admin/add-employee/',
    name: 'AddEmployee',
    meta: {
      isViewMode: false
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewEmployee.vue')
  },
  {
    path: '/admin/performance-reviews/',
    name: 'PerformanceReviews',
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/PerformanceReviews.vue')
  },
  {
    path: '/admin/performance-reviews/:id',
    name: 'ViewPerformanceReview',
    meta: {
      isViewMode: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewPerformanceReview.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

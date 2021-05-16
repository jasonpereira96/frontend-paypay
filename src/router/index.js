import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EmployeeHome',
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/employee/EmployeeHome.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/Home.vue')

  },
  {
    path: '/admin',
    name: 'AdminHome',
    meta: {
      admin: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AdminHome.vue')
  },
  {
    path: '/admin/employee/:id',
    name: 'ViewEmployee',
    meta: {
      isViewMode: true, admin: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewEmployee.vue')
  },
  {
    path: '/admin/add-employee/',
    name: 'AddEmployee',
    meta: {
      isViewMode: false,
      admin: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewEmployee.vue')
  },
  {
    path: '/admin/performance-reviews/',
    name: 'PerformanceReviews',
    meta: {
      admin: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/PerformanceReviews.vue')
  },
  {
    path: '/admin/performance-reviews/:id',
    name: 'ViewPerformanceReview',
    meta: {
      isViewMode: true,
      admin: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewPerformanceReview.vue')
  },
  {
    path: '/admin/add-performance-review',
    name: 'AddPerformanceReview',
    meta: {
      isViewMode: false,
      admin: true
    },
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/admin/AddViewPerformanceReview.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/Login.vue')
  },
  {
    path: '/submit-review/:reviewId/:revieweeId',
    name: 'SubmitReview',
    component: () => import(/* webpackChunkName: "AdminHome" */ '../views/employee/SubmitReview.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = !!store.state.auth.loginSuccessful
  const isAdmin = !!store.state.auth.isAdmin
  if (!loggedIn) {
    next({
      name: 'Login'
    })
  }
  if (isAdmin && !to.meta.admin) {
    next({
      name: 'AdminHome'
    })
  }
  if (!isAdmin && to.meta.admin) {
    next({
      name: 'EmployeeHome'
    })
  }
  next()
})

export default router

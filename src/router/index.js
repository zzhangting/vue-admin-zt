import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },


  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'CustomerList',//name不可重复
        component: () => import('@/pages/customer/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '顾客管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/employee',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'EmployeeList',//name不可重复
        component: () => import('@/pages/employee/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '员工管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'ProductList',//name不可重复
        component: () => import('@/pages/product/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '产品管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'CategoryList',//name不可重复
        component: () => import('@/pages/category/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '栏目管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/commit',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'CommitList',//name不可重复
        component: () => import('@/pages/commit/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '评论管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'OrderList',//name不可重复
        component: () => import('@/pages/order/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '订单管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'AddressList',//name不可重复
        component: () => import('@/pages/address/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '地址管理', icon: 'tree' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'OrderList',//name不可重复
        component: () => import('@/pages/order/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '订单管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    children: [
      {
        path: 'List',
        name: 'AddressList',//name不可重复
        component: () => import('@/pages/address/List'),//箭头函数的this，指向外部函数的this
        meta: { title: '地址管理', icon: 'example' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

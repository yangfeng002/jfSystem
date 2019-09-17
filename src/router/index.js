import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import BookList from '@/components/book/list'
import BookCategoryList from '@/components/bookcategory/list'

import UserList from '@/components/bookcategory/list'
import UserChangePwd from '@/components/settings/changepwd'
import UserProfile from '@/components/settings/profile'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
const Register = resolve => require(['@/components/Register'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path:'/register',
      name:'注册',
      component:Register
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '管理台',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/manageboard/dynamicModule', component: UserList, name: '模块动态管理', menuShow: true},
        {path: '/manageboard/asyncReport', component: UserList, name: '动态报表配置', menuShow: true},
        {path: '/manageboard/viewReport', component: UserList, name: '可视化报表配置', menuShow: true},
        {path: '/manageboard/userServe', component: UserList, name: '用户自服务管理',menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '家庭游戏',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/familygame/test1', component: BookList, name: '列表1', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '个人游戏',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/personalgame/test', component: BookList, name: '列表1', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '政企游戏',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/companygame/test', component: BookList, name: '列表1', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '善跑模块',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/runwell/test', component: BookList, name: '列表1', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/settings/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/settings/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '监控',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/monitor/operateInfo', component: UserProfile, name: '使用情况监控', menuShow: true},
        {path: '/monitor/reportError', component: UserChangePwd, name: '报表故障监控', menuShow: true},
        {path: '/monitor/reportRelay', component: UserChangePwd, name: '报表延时监控', menuShow: true},
        {path: '/monitor/dynamicReport', component: UserChangePwd, name: '动态报表监控', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-manageboard')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-manageboard'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router

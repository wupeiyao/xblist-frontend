import { createRouter, createWebHashHistory } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { close, start } from '@/utils/nprogress'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/welcome/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/index.vue')
    },

    {
      path: '/',
      redirect: '/welcome' // 默认路由重定向到/welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      children: [
        {
          name: '/home/Task',
          path: 'task',
          component: () => import('@/views/home/main/Task.vue')
        },
        {
          name: '/home/everyday',
          path: 'everyday',
          component: () => import('@/views/home/main/EveryDay.vue')
        },
        {
          name: '/home/notes',
          path: 'notes',
          component: () => import('@/views/home/main/Notes.vue')
        },
        {
          name: '/home/setting',
          path: 'setting',
          component: () => import('@/views/home/main/Setting.vue')
        }
      ]
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: () => import('@/views/home/usercenter/index.vue')
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: () => import('@/views/home/subscribe/index.vue')
    },
    {
      path: '/tasksetting',
      name: 'tasksetting',
      component: () => import('@/views/home/settings/TaskSetting.vue')
    },
    {
      path: '/regularsetting',
      name: 'regularsetting',
      component: () => import('@/views/home/settings/Regular.vue')
    },
    {
      path: '/changepassword',
      name: 'changepassword',
      component: () => import('@/views/home/settings/ChangePassword.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/home/settings/About.vue')
    },
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = !!userStore.$state.token // 根据你的状态管理设置登录状态
  start()
  // 如果用户已登录，禁止访问 /welcome, /login, /register
  if (isLoggedIn && (to.path === '/welcome' || to.path === '/login' || to.path === '/register')) {
    next({ path: '/home/everyday' }) // 跳转到主页或其他你希望重定向的路由
  } else if (!isLoggedIn && (to.path !== '/welcome' && to.path !== '/login' && to.path !== '/register')) {
    next({ path: '/login' }) // 未登录用户重定向到登录页面
  } else {
    next() // 允许访问
  }
})
router.afterEach((to, from, next) => {
  close()
})
export default router

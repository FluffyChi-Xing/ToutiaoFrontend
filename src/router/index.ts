import {createRouter, createWebHashHistory} from 'vue-router'
import LayoutPage from "../Layout/LayoutPage.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import DashBoard from '../views/DashBoard/index.vue'
import AnalysisPage from "@/views/DashBoard/_component/AnalysisPage.vue";
import HomePage from "@/views/DashBoard/_component/HomePage.vue";
import MoreInformation from "@/views/DashBoard/_component/MoreInformation.vue";
import PaperList from "@/views/ContentList/_component/PaperList.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutPage,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashBoard,
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: {
                title: '详细分析'
              },
              component: AnalysisPage,
              children: [
                {
                  path: '/dashboard/analysis/:id',
                  name: 'analysisDetail',
                  component: MoreInformation
                }
              ]
            },
            {
              path: '/dashboard/home',
              name: 'home',
              component: HomePage,
              meta: {
                title: '仪表盘'
              },
            }
          ]
        },
        {
          path: '/sendPaper',
          name: 'sendPaper',
          meta: {
            title: '发布文章'
          },
          component: () => import('@/views/SendPaper/index.vue')
        },
        {
          path: '/contentList',
          name: 'contentList',
          meta: {
            title: '内容列表'
          },
          component: () => import('@/views/ContentList/index.vue'),
          children: [
            {
              path: '/contentList/paperList',
              name: 'paperList',
              meta: {
                title: '文章列表'
              },
              component: PaperList
            }
          ]
        },
        {
          path: '/resource',
          name: 'resource',
          meta: {
            title: '素材管理'
          },
          component: () => import('@/views/ResourceManage/index.vue')
        },
        {
          path: '/fans',
          name: 'fans',
          meta: {
            title: '粉丝管理'
          },
          component: () => import('@/views/FanManage/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

function getToken() {
  const token = localStorage.getItem('token')
  return !!token;
  // TODO 验证token是否过期
}

router.beforeEach(async (to) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
  // 处理路由重定向
  if (to.path === '/') {
    return '/dashboard/home'
  }
  if (to.path === '/contentList') {
    return '/contentList/paperList'
  }
  if (getToken()) {
    if (to.path === '/login') {
      return '/dashboard/home'
    }
  } else {
    if (to.path !== '/login') {
      return '/login'
    }
  }
})


router.afterEach(() => {
  NProgress.done()
})
export default router

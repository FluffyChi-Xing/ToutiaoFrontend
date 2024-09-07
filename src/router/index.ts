import {createRouter, createWebHashHistory} from 'vue-router'
import LayoutPage from "../Layout/LayoutPage.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import DashBoard from '../views/DashBoard/index.vue'
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
          path: '',
          name: 'dashboard',
          meta: {
            title: 'Dashboard'
          },
          component: DashBoard
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
})


router.afterEach(() => {
  NProgress.done()
})
export default router

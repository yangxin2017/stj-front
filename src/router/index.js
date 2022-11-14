import Vue from 'vue'
import VueRouter from 'vue-router'

// 页面二级容器
import Container from '../views/Container/Index.vue'
// 默认首页
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/ecology",
    name: "monitor",
    component: Container,
    children: [
      {
        path: "/ecology/index",
        name: "Index",
        component: () => import('../views/Ecology/Index.vue'),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/ecology/monitor",
        name: "Monitor",
        component: () => import('../views/Ecology/Monitor.vue'),
        meta: {
          title: "数据导入-监测数据"
        }
      },
      {
        path: "/ecology/certification",
        name: "Certification",
        component: () => import('../views/Ecology/Certification.vue'),
        meta: {
          title: "数据导入-核证数据"
        }
      },
      {
        path: "/ecology/recheckdata",
        name: "recheckdata",
        component: () => import('../views/Ecology/RecheckData.vue'),
        meta: {
          title: "数据复核-复核数据"
        }
      },
      {
        path: "/ecology/parameter",
        name: "Parameter",
        component: () => import('../views/Ecology/Parameter.vue'),
        meta: {
          title: "数据复核-参数设置"
        }
      },
      {
        path: "/ecology/query/detectiondataquery",
        name: "detectiondataquery",
        component: () => import('../views/Ecology/query/DetectionDataQuery.vue'),
        meta: {
          title: "数据查询-监测数据"
        }
      },
      {
        path: "/ecology/query/checkdataquery",
        name: "checkdataquery",
        component: () => import('../views/Ecology/query/CheckDataQuery.vue'),
        meta: {
          title: "数据查询-核证数据"
        }
      },
      {
        path: "/ecology/query/re-checkdataquery",
        name: "re-checkdataquery",
        component: () => import('../views/Ecology/query/Re-checkDataQuery.vue'),
        meta: {
          title: "数据查询-复核数据"
        }
      },
      {
        path: "/ecology/query/auditdataquery",
        name: "auditdataquery",
        component: () => import('../views/Ecology/query/AuditDataQuery.vue'),
        meta: {
          title: "数据查询-审核数据"
        }
      },
      {
        path: "/ecology/leaderreview",
        name: "leaderreview",
        component: () => import('../views/Ecology/LeaderReview.vue'),
        meta: {
          title: "数据审核"
        }
      },
      {
        path: "/ecology/statisticanalysis",
        name: "statisticanalysis",
        component: () => import('../views/Ecology/StatisticAnalysis.vue'),
        meta: {
          title: "统计分析"
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  // 未配置的路由页面
  {
    path: "*",
    name: "404",
    component: () => import('../views/404.vue')
  },
  // 设置默认加载页面
  {
    path: "/",
    redirect: "/ecology/index"
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title
  next()
}
)

export default router

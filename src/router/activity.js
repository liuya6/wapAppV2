const Activity = () => import(/* webpackChunkName:'start' */ "../views/activity/Activity");
const Applyactivitylist = () => import(/* webpackChunkName:'other' */ "../views/activity/Applyactivitylist.vue");
const ApplyActivityDetail = () => import(/* webpackChunkName:'other' */ "../views/activity/ApplyActivityDetail.vue");

export default [
  {
    path: '/activity',
    name: 'activity',
    component: Activity,
    meta: {
      keepAlive: true,
      DocumentTitle: "活动"
    }
  },
  {
    path: "/applyactivitylist",
    name: "applyactivitylist",
    component: Applyactivitylist,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/applyactivitydetail/:id",
    name: "applyactivitydetail",
    component: ApplyActivityDetail
  }
]

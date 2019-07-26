const RedPack = () => import("../views/find/RedPack");
const Vip = () => import("../views/find/Vip");
const VipDetails = () => import("../views/find/VipDetails");

export default [
  {
    path: '/redpack',
    name: 'redpack',
    component: RedPack,
    meta: {
      requiresAuth :true
    }
  },
  {
    path: '/vip',
    name: 'vip',
    component: Vip,
    meta: {
      requiresAuth :true,
      testIsNo: true,
    }
  },
  {
    path: '/vipDetails',
    name: 'vipDetails',
    component: VipDetails,
    meta: {
      requiresAuth :true,
      testIsNo: true
    }
  },
]

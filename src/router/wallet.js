const Wallet = () => import(/* webpackChunkName:'start' */ "../views/wallet/Wallet");
const Withdraw = () => import(/* webpackChunkName:'withdraw' */ "../views/wallet/Withdraw");
const RechargeRecord = () => import(/* webpackChunkName:'start' */ "../views/wallet/RechargeRecord");
const WithdrawalsRecord = () => import (/* webpackChunkName:'withdraw' */ "../views/wallet/WithdrawalsRecord");
const Paying = () => import(/* webpackChunkName:'recharge' */ "../views/wallet/Paying");

export default [
  {
    path: '/wallet',
    name: 'wallet',
    component: Wallet,
    meta: {
      requiresAuth :true,
      testIsNo: true
    }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: Withdraw,
    meta: {
      requiresAuth :true,
      testIsNo: true
    }
  },
  {
    path: '/rechargerecord',
    name: 'rechargerecord',
    component: RechargeRecord,
    meta: {
      requiresAuth :true,
      testIsNo: true
    }
  },
  {
    path: '/withdrawrecord',
    name: 'withdrawrecord',
    component: WithdrawalsRecord,
    meta: {
      requiresAuth :true,
      testIsNo: true
    }
  },
  {
    path: '/paying',
    name: 'paying',
    component: Paying,
    meta: {
      requiresAuth :true,
      testIsNo: true
    }
  }
]

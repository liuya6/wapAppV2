const User = () => import("../views/user/User");
// const Set = () => import("../views/user/Set");
const Notice = () => import( /* webpackChunkName:'start' */ "../views/user/Notice");
const SecurityCenter = () => import( /* webpackChunkName:'user' */ "../views/user/SecurityCenter");
const YueBaoHome = () => import("../views/user/YueBaoHome");
const OnlineService = () => import("../views/user/OnlineService");
const IncomeExpenses = () => import("../views/user/IncomeExpenses");
const TransferIn = () => import("../views/user/TransferIn");
const TransferOut = () => import("../views/user/TransferOut");
const YuebaoList = () => import("../views/user/YuebaoList");
const Register = () => import( /* webpackChunkName:'start' */ "../views/user/Register");
const Login = () => import( /* webpackChunkName:'start' */ "../views/user/Login");
// const LoginPwd = () => import("../views/user/LoginPwd");
// const NextLoginPwd = () => import("../views/user/NextLoginPwd");
const Amount = () => import( /* webpackChunkName:'user' */ "../views/user/Amount");
const Bill = () => import( /* webpackChunkName:'user' */ "../views/user/Bill");
const AboutUs = () => import( /* webpackChunkName:'user' */ "../views/user/AboutUs");
const Help = () => import( /* webpackChunkName:'user' */ "../views/user/Help");
const UserTreaty = () => import( /* webpackChunkName:'start' */ "../views/user/UserTreaty");
const ProfitAndLoss = () => import( /* webpackChunkName:'user' */ "../views/user/ProfitAndLoss");
const Record = () => import( /* webpackChunkName:'user' */ "../views/user/Record");
const SelectBankCard = () => import( /* webpackChunkName:'withdraw' */ "../views/user/SelectBankCard");
const BankCard = () => import( /* webpackChunkName:'withdraw' */ "../views/user/BankCard");
const AddBankCard = () => import( /* webpackChunkName:'withdraw' */ "../views/user/AddBankCard");
const Service = () => import( /* webpackChunkName:'user' */ "../views/user/Service");
const ModifyPwd = () => import( /* webpackChunkName:'usercenter' */ "../views/user/ModifyPwd");
const PayeeName = () => import( /* webpackChunkName:'usercenter' */ "../views/user/PayeeName");
const VerifyPhone = () => import( /* webpackChunkName:'usercenter' */ "../views/user/VerifyPhone");
const BindEmail = () => import( /* webpackChunkName:'usercenter' */ "../views/user/BindEmail");
const FundPwd = () => import( /* webpackChunkName:'usercenter' */ "../views/user/FundPwd");
const Suggestions = () => import( /* webpackChunkName:'user' */ "../views/user/Suggestions");
const ScanCodePaying = () => import( /* webpackChunkName:'recharge' */ "../views/user/ScanCodePaying");
const BankPaying = () => import( /* webpackChunkName:'recharge' */ "../views/user/BankPaying");
const ScanCodeSubmit = () => import( /* webpackChunkName:'recharge' */ "../views/user/ScanCodeSubmit");
const BankSubmit = () => import( /* webpackChunkName:'recharge' */ "../views/user/BankSubmit");
const MsgDetail = () => import( /* webpackChunkName:'msg' */ "../views/user/MsgDetail");
const MySpread = () => import( /* webpackChunkName:'msg' */ "../views/user/MySpread");
const Download = () => import( /* webpackChunkName:'msg' */ "../views/user/Download");
//代理邀请好友
const Recommend = () => import("../views/agent/Recommend");
const AgentRule = () => import("../views/agent/AgentRule");

export default [{
    path: '/recommend',
    name: 'recommend',
    component: Recommend,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/agentRule',
    name: 'agentRule',
    component: AgentRule,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/set',
  //   name: 'set',
  //   component: Set,
  //   meta: {
  //     requiresAuth :true,
  //     testIsNo: true
  //   }
  // },
  {
    path: '/myspread',
    name: 'myspread',
    component: MySpread,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/download',
    name: 'download',
    component: Download,
    meta: {
      // requiresAuth :true,
      testIsNo: true
    }
  },
  {
    path: '/notice/:type?',
    name: 'notice',
    component: Notice,
    // meta:{
    //   requiresAuth :true
    // }
  },
  {
    path: '/securityCenter',
    name: 'securityCenter',
    component: SecurityCenter,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/yuebaoHome',
    name: 'yuebaoHome',
    component: YueBaoHome,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },

  {
    path: '/onlineService',
    name: 'onlineService',
    component: OnlineService,
    meta: {
      requiresAuth: true,
      testIsNo: true,
      keepAlive: true,
      DocumentTitle: "我的客服"
    }
  },
  {
    path: '/incomeExpenses',
    name: 'incomeExpenses',
    component: IncomeExpenses,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/yuebaoList',
    name: 'yuebaoList',
    component: YuebaoList,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/transferIn',
    name: 'transferIn',
    component: TransferIn,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/transferOut',
    name: 'transferOut',
    component: TransferOut,
    meta: {
      requiresAuth: true,
      testIsNo: true,
      // keepAlive: true,
      // DocumentTitle: "转出"
    }
  },
  {
    path: '/register/:xcode?',
    name: 'register',
    component: Register,
    meta: {
      denyAuth: true // 拒绝登录访问
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      denyAuth: true // 拒绝登录访问
    }
  },
  // {
  //   path: '/loginpwd',
  //   name: 'loginpwd',
  //   component: LoginPwd,
  // },
  // {
  //   path: '/nextloginpwd',
  //   name: 'nextloginpwd',
  //   component: NextLoginPwd,
  // },
  {
    path: '/amount',
    name: 'amount',
    component: Amount,
    meta: {
      requiresAuth: true,
      testIsNo: true
    }
  },
  {
    path: '/bill',
    name: 'bill',
    component: Bill,
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUs,
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
  },
  {
    path: '/usertreaty',
    name: 'usertreaty',
    component: UserTreaty,
  },
  {
    path: '/profitandloss',
    name: 'profitandloss',
    component: ProfitAndLoss,
  },
  {
    path: '/record',
    name: 'record',
    component: Record,
  },
  {
    path: '/selectbankcard',
    name: 'selectbankcard',
    component: SelectBankCard,
  },
  {
    path: '/bankcard',
    name: 'bankcard',
    component: BankCard,
  },
  {
    path: '/addbankcard',
    name: 'addbankcard',
    component: AddBankCard,
  },
  {
    path: '/service',
    name: 'service',
    component: Service,
  },
  {
    path: '/modifyPwd',
    name: 'modifyPwd',
    component: ModifyPwd,
  },
  {
    path: '/payeeName',
    name: 'payeeName',
    component: PayeeName,
  },
  {
    path: '/verifyPhone',
    name: 'verifyPhone',
    component: VerifyPhone,
  },
  {
    path: '/bindEmail',
    name: 'bindEmail',
    component: BindEmail,
  },
  {
    path: '/fundPwd',
    name: 'fundPwd',
    component: FundPwd,
  },
  {
    path: '/suggestions',
    name: 'suggestions',
    component: Suggestions,
  },
  {
    path: '/scancodepaying/:id?',
    name: 'scancodepaying',
    component: ScanCodePaying,
  },
  {
    path: '/bankpaying/:id?',
    name: 'bankpaying',
    component: BankPaying,
  },
  {
    path: '/scancodesubmit',
    name: 'scancodesubmit',
    component: ScanCodeSubmit,
  },
  {
    path: '/banksubmit',
    name: 'banksubmit',
    component: BankSubmit,
  },

  {
    path: '/msgdetail',
    name: 'msgdetail',
    component: MsgDetail,
  },
]

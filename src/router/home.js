const Home = () => import(/* webpackChunkName:'start' */ "../views/home/Home");
const GamesLobby = () => import(/* webpackChunkName:'start' */ "../views/home/GamesLobby");
const Playing = () => import(/* webpackChunkName:'start' */ "../views/home/Playing");
const ElectronicGames = () => import(/* webpackChunkName:'start' */ "../views/home/ElectronicGames");

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/gamesLobby/:classify?',
    name: 'GamesLobby',
    component: GamesLobby,
    meta: {
      keepAlive: true,
      DocumentTitle: "游戏大厅"
    }
  },
  {
    path: '/playing/:typeKey?/:classify?',
    name: 'playing',
    component: Playing,
  },
  {
    path: '/electronicGames/:typeKey/:classify',
    name: 'electronicGames',
    component: ElectronicGames,
  },
]

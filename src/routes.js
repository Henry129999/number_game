import Home from './pages/Home';
import PlayGame from './pages/PlayGame'
import RecoverGame from './pages/RecoverGame'

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    key: 'home',
  }, {
    path: "/playGame",
    component: PlayGame,
    exact: true,
    key: 'playGame',
    name: ''
  }, {
    path: "/recoverGame",
    component: RecoverGame,
    exact: true,
    key: 'recoverGame',
  },
];

export default routes;
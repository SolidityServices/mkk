import Vue from 'vue';
import Router from 'vue-router';

// View imports
import Index from './views/Index';
import PoolCreator from './components/PoolCreator'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: 'pool-creator',
      name: 'pool-creator',
      component: PoolCreator,
    }
  ],
});

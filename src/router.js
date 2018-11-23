import Vue from 'vue';
import Router from 'vue-router';

// View imports
import Index from './views/Index.vue';
import Project from './views/Project.vue';
import PoolCreator from './views/PoolCreator.vue';
import DeployContract from './views/DeployContract.vue';

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
    },
    {
      path: 'deploy-contract',
      name: 'deploy-contract',
      component: DeployContract,
    },
    {
      path: 'project',
      name: 'project',
      component: Project,
    },
  ],
});

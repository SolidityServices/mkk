import Vue from 'vue';
import Router from 'vue-router';

// View imports
import Layout from './views/Layout.vue';
import Project from './views/Project.vue';
import PoolCreator from './views/pool/PoolCreator.vue';
import DeployContract from './views/DeployContract.vue';
import PoolList from './views/pool/PoolList.vue';
import PoolEdit from './views/pool/PoolEdit.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Layout,
    children: [
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
        path: 'project/:address',
        name: 'project',
        component: Project,
      },
      {
        path: 'project/:address/edit',
        name: 'project.edit',
        component: PoolEdit,
      },
      {
        path: '/',
        name: 'pool-list',
        component: PoolList,
      },
    ],
  }],
});

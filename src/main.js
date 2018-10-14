import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import VueRouter from 'vue-router';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// components
import Header from './Header.vue';
import Footer from './Footer.vue';
import PoolCreator from './PoolCreator.vue';
import ProjectName1 from './ProjectName1.vue';
import ProjectName2 from './ProjectName2.vue';
import DeployContract from './DeployContract.vue';

Vue.component('app-header', Header,);
Vue.component('app-footer', Footer);

const routes = [
  { path: '/pool-creator', component: PoolCreator},
  { path: '/project-name1', component: ProjectName1},
  { path: '/project-name2', component: ProjectName2},
  { path: '/deploy-contract', component: DeployContract}
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import Vue from 'vue'
import { sync } from 'vuex-router-sync';
import Vuex from 'vuex';
import store from './store';
import router from './router';
import App from './App.vue';
import Solid from './services/Solid';

sync(store, router);

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(Solid);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from '@/app/store';
import router from '@/app/arch/router';
import './plugins/loading';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;
Vue.use(Toasted);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

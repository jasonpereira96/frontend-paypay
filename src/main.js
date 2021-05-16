import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import VueLoading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
  
Vue.component('multiselect', Multiselect)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueLoading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

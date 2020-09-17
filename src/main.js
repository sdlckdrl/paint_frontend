import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import vueMoment from 'vue-moment' ;

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(vueMoment)

export const eventBus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

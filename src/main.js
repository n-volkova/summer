import Vue from 'vue'
import App from './App.vue'

import VueTippy from 'vue-tippy'

import 'fullpage.js/vendors/scrolloverflow'
import 'fullpage.js/dist/fullpage.css'
import VueFullPage from 'vue-fullpage.js'

import store from './store'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(VueTippy)
Vue.use(VueFullPage)
Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')

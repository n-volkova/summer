import Vue from 'vue'
import App from './App.vue'

import getBrowserLocale from './utils/getBrowserLocale'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const messages = {
    ru: {
        message: {
            hello: 'привет'
        }
    },
    en: {
        message: {
            hello: 'hello'
        }
    }
}

const i18n = new VueI18n({
    locale: getBrowserLocale(),
    messages,
})

import VueTippy from 'vue-tippy'

import 'fullpage.js/vendors/scrolloverflow'
import 'fullpage.js/dist/fullpage.css'
import VueFullPage from 'vue-fullpage.js'

import store from './store'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(VueTippy)
Vue.use(VueFullPage)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')

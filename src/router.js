import Vue from 'vue'
import Router from 'vue-router'
// import store from './store'

import Client from './views/Client.vue'
// import Visitor from './views/Visitor.vue'
// import CardNotFound from './views/CardNotFound.vue'
// import NoResult from './views/NoResult.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/:hash([a-z0-9]{16})',
        //     component: Visitor,
        //     beforeEnter: (to, from, next) => {
        //         const url = `https://mw.rocketbank.ru/api/v1/summer2019/shares/${to.params.hash}`
        //         this.$http({
        //             url: url,
        //             method: 'GET'
        //         }).then(res => {
        //             if (Object.keys(res.data.result).length) {
        //                 store.commit('SET_RESULT', res.data.result)
        //                 store.commit('SET_INVITE_URL', res.data.invite_url)
        //                 next()
        //             } else {
        //                 next({ path: '/' })
        //             }
        //         })
        //         .catch(error => {
        //             next({ path: '/' })
        //         })
        //     }
        // },
        {
            path: '/',
            component: Client
        },
        { 
            path: '*',
            redirect: '/', 
        },
        // { 
        //     path: '/404',
        //     component: CardNotFound 
        // },
        // { 
        //     path: '/noresult',
        //     component: NoResult 
        // }
    ]
})

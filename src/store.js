import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        token: '',
        hash: '',
        isClient: false,
        invite_url: '',
        signup_url: '',
		bar_amount: 0,
        cinema_amount: 0,
        taxi_amount: 0,
        carshare_amount: 0,
        top_merchants: [],
        best_merchant: {
            name: '',
            icon: '',
            count: ''
        },
        cashback: 0,
        miles_outgo: 0,
        best_night_date: '',
        best_night_amount: 0,
        pages: [],
        shareableScreens: []
    },
    getters: {
        getTopMerchants: state => {
            return state.top_merchants
        },
        getToken: state => {
            return state.token
        },
        getHash: state => {
            return state.hash
        },
        getInviteUrl: state => {
            return state.invite_url
        },
        getSignupUrl: state => {
            return state.signup_url
        },
        getLink: state => {
            return `https://leto.rocketbank.ru/${state.hash}`
        },
        getPages: state => {
            return state.pages
        },
        getClientStatus: state => {
            return state.isClient
        },
        getShareableScreens: state => {
            return state.shareableScreens
        },
    },
	mutations: {
		SET_RESULT(state, data) {

            if (data.best_night_date) {
                let nightDate = new Date(data.best_night_date)
                let formatter = new Intl.DateTimeFormat('ru', {
                    month: 'long',
                    day: 'numeric'
                })
                state.best_night_date = formatter.format(nightDate)
                state.shareableScreens.push({
                    id: 'best_night',
                    title: 'Безбашенная ночь',
                    visible: false
                })
            }
              
            if (data.bar_amount) {
                state.bar_amount = data.bar_amount
                state.shareableScreens.push({
                    id: 'bar',
                    title: 'Бары',
                    visible: false
                })
            }

            if (data.cashback) {
                state.cashback = data.cashback
                state.shareableScreens.push({
                    id: 'cashback',
                    title: 'Рокетрубли',
                    visible: false
                })
            }
            
            if (data.carshare_amount) {
                state.carshare_amount = data.carshare_amount
                state.shareableScreens.push({
                    id: 'carshare',
                    title: 'Каршеринг',
                    visible: false
                })
            }
            
            if (data.taxi_amount) {
                state.taxi_amount = data.taxi_amount
                state.shareableScreens.push({
                    id: 'taxi',
                    title: 'Такси',
                    visible: false
                })
            }
            
            if (data.best_merchant) {
                state.best_merchant = data.best_merchant
                state.shareableScreens.push({
                    id: 'best_merchant',
                    title: 'Любимый покупатель',
                    visible: false
                })
            }

            if (data.cinema_amount) {
                state.cinema_amount = data.cinema_amount
                state.shareableScreens.push({
                    id: 'cinema',
                    title: 'Кино',
                    visible: false
                })
            }

            if (data.top_merchants && data.top_merchants.length) {
                data.top_merchants.forEach((merchant) => {
                    state.top_merchants.push(merchant)
                })
                state.shareableScreens.push({
                    id: 'top_merchants',
                    title: 'Самые крупные покупки',
                    visible: false
                })
            }

            state.miles_outgo = data.miles_outgo
            state.best_night_amount = data.best_night_amount
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_HASH(state, hash) {
            state.hash = hash
        },
        SET_SIGNUP_URL(state, signup_url) {
            state.signup_url = signup_url
        },
        SET_INVITE_URL(state, invite_url) {
            state.invite_url = invite_url
        },
        SET_CLIENT_STATUS(state, status) {
            state.isClient = status
        },
        TOGGLE_SCREEN_VISIBILITY(state, screenIndex) {
            let screen = state.shareableScreens[screenIndex]
            let position = state.pages.indexOf(screen.id)

            screen.visible = !screen.visible

            if (screen.visible && position == -1) {
                state.pages.push(screen.id)
            } else if (!screen.visible && position !== -1) {
                state.pages.splice(position, 1)
            }
        },
        RESET_PAGES(state) {
            state.pages = []
            state.shareableScreens = []
        },
        RESET_ALL(state) {
            state.token = ''
            state.hash = ''
            state.invite_url = ''
            state.isClient = false
            state.best_night_date = ''
            
			state.bar_amount = 0
            state.cinema_amount = 0
            state.taxi_amount = 0
            state.carshare_amount = 0

            state.top_merchants = []

            state.best_merchant = null

            state.cashback = 0
            state.miles_outgo = null
            state.best_night_amount = 0
        },
    },
	strict: false,
})

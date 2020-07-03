<template>
    <div class="login-wrapper">
        <div v-if="!isMobile" class="circle"></div>
        <div class="sun" :class="isCurrent ? 'rotate' : ''"></div>
        <div class="content">
            <div class="lang">
                <!-- <div class="lang-btn lang-ru" :class="currentLang === 'ru' && 'active'" @click="changeLang('ru')">RU</div> -->
                <!-- <div class="lang-btn lang-en" :class="currentLang === 'en' && 'active'" @click="changeLang('en')">EN</div> -->
            </div>
            <div class="title fadeInLeft delay-1">
                Хотите узнать,<br>как прошло ваше лето? 
            </div>
            <div class="stampede-placeholder fadeInLeft delay-4">
                <transition name="fade">
                    <div class="start-btn" @click.once="toMain">Да!</div>
                </transition>
            </div>
            <div class="disclaimer">
                Мы покажем вам вашу увлекательную летнюю&nbsp;статистику. <br>
                Её никто не увидит, пока вы сами ей не поделитесь.
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        isCurrent: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            stats: {
                "bar_amount": 6360,
                "cinema_amount": 4360,
                "taxi_amount": 8993,
                "carshare_amount": 27462,
                "top_merchants": [
                    {
                        "name": "Спорт-Марафон",
                        "icon": "https://ftp.rocketbank.ru/public.rocketbank.ru/uploads/merchants/31576/cool_big_2c66efed-9810-4fe2-b856-62c06ecbb0b0.png",
                        "amount": "29000.0"
                    },
                    {
                        "name": "Bike24",
                        "icon": "https://ftp.rocketbank.ru/public.rocketbank.ru/uploads/merchants/661624/cool_big_39cb3455-789c-4ea1-a617-32a568a0508d.png",
                        "amount": "18730.0"
                    },
                    {
                        "name": "Китайские новости",
                        "icon": "https://ftp.rocketbank.ru/public.rocketbank.ru/uploads/merchants/259711/cool_big_3fb5471f-753a-454e-ae3a-4ad0dc090310.png",
                        "amount": "6267.97"
                    },
                    {
                        "name": "Cinnabon",
                        "icon": "https://ftp.rocketbank.ru/public.rocketbank.ru/uploads/merchants/3592/cool_big_450acc69-dac4-492d-89ce-85d8b5d3efa1.png",
                        "amount": "4102.23"
                    },
                ],
                "best_merchant": {
                    "name": "Starbucks",
                    "icon": "https://ftp.rocketbank.ru/public.rocketbank.ru/uploads/merchants/249/cool_big_5624e1f1-f181-4593-a072-4177c290f832.png",
                    "count": "146"
                },
                "cashback": 2484,
                "miles_outgo": 6271,
                "best_night_date": "2019-06-11T00:00:00.000+03:00",
                "best_night_amount": 7485
            }
        }
    },
    computed: {
        isMobile() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
                return true
            } else {
                return false
            }
        },
        currentLang() {
            return this.$i18n.locale
        }
    },
    methods: {
        toMain() {
            this.$store.commit('SET_RESULT', this.stats)
            this.$emit('loginSuccess')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.login-wrapper {
    overflow: hidden;
    position: relative;
    min-height: 100vh;
    padding-top: 1px;
    color: #000;
    .lang {
        display: inline-flex;
        flex-direction: row;
        @media (min-width: 800px) {
            margin-top: 257px;
            margin-bottom: 40px;
        }
        .lang-btn {
            padding: 10px 15px;
            font-size: 24px;
            line-height: 1.3;
            font-weight: 500;
            background-color: rgba(255, 255, 255, .5);
            transition: opacity .3s linear;
            cursor: pointer;
            &:nth-child(1) {
                border-top-left-radius: 7px;
                border-bottom-left-radius: 7px;
            }
            &:nth-child(2) {
                border-top-right-radius: 7px;
                border-bottom-right-radius: 7px;
            }
            &:hover {
                background-color: rgba(255, 255, 255, .7);
            }
            &.active {
                background-color: #fff;
            }
        }
    }
    .title {
        margin-bottom: 31px;
        font-size: 75px;
        line-height: .9;
        font-weight: 900;
        color: #FFFFFF;
        @media (max-width: 880px) {
            margin-top: 137px;
            font-size: 48px;
        }
    }
    .sun {
        position: absolute;
        width: 1024px;
        height: 1024px;
        top: -452px;
        right: -222px;
        background-image: url('~@/assets/login-sun.png');
        background-size: contain;
        background-repeat: no-repeat;
        z-index: 1;
        @media (max-width: 800px) {
            width: 253.27px;
            height: 253.27px;
            right: -118px;
            top: 93.52px;
        }
    }
    .content {
        position: relative;
        isolation: isolate;
        z-index: 2;
        @media (max-width: 1600px) {
            margin-right: 30px;
        }
    }
    .circle {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(1106.34px at 50.13% 49.87%, rgba(245, 255, 135, 0.53) 0%, rgba(255, 122, 0, 0.53) 100%);
        pointer-events: none;
        z-index: -1;
        width: 2207px;
        height: 2207px;
        left: -458px;
        top: 253px;
        z-index: 0;
    }
}
.start-btn {
    display: block;
    width: 280px;
    height: 80px;
    margin-bottom: 60px;
    background: #000000;
    border-radius: 15px;
    font-size: 20px;
    line-height: 80px;
    font-weight: 700;
    color: #FFB627;
    text-align: center;
    text-decoration: none;
    outline: none;
}
.disclaimer {
    margin-bottom: 130px;
    font-size: 24px;
    line-height: 130%;
    font-weight: 500;
    color: inherit;
    @media (max-width: 880px) {
        margin-bottom: 50px;
        font-size: 20px;
        line-height: 24px;
    }
    @media (min-width: 880px) and (max-width: 1500px) {
        font-size: 21px;
    }
}
</style>

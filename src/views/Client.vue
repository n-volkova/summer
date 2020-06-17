<template>
    <div class="client-page">
        <transition name="fade" mode="out-in">
            <popup 
                v-if="popupVisible" 
                @hidePopup="hidePopup"
                @goToStart="goToStart" 
            />
        </transition>

        <div class="backgrounds">
            <div 
                v-for="(item, index) in bgSections" 
                :key="`${item}-bg`" 
                class="bg" 
                :class="[`${item}-bg`, index > currentIndex && 'hidden']">

                    <div v-if="item === 'cinema'" v-show="item === 'cinema'" class="film-wrapper">
                        <div class="film" :class="current === 'cinema' && 'animateFilm'"></div>
                    </div>

                    <div v-else-if="item === 'taxi'" v-show="item === 'taxi'" id="taxiBg"></div>

                    <div v-else-if="item === 'carsharing'" v-show="item === 'carsharing'" class="wheel" :class="current === 'carsharing' && 'spin'"></div>
            </div>
        </div>

        <header>
            <div class="content">
                <div class="logo" @click="goToStart()">
                    <div class="logo__img"></div>
                    <div class="logo__text">Рокетбанк</div>
                </div>
                <div v-if="loggedIn && current !== 'share'" 
                    class="share" 
                    :class="{
                        'active': popupVisible,
                        'mobile-share': isMobile
                    }"
                    v-html="!isMobile ? 'Поделиться' : ''"
                    @click="showPopup()" />
            </div>
        </header>
        
        <transition name="fade" mode="out-in">
            <login 
                v-if="!loggedIn" 
                @loginSuccess="onLoginSuccess" 
                :is-current="!loggedIn" />

            <div v-else class="container">
                <full-page ref="fullpage" :options="options" id="fullpage" v-if="sections.length">
                    <div v-for="item in sections"
                        :key="item"
                        class="section" 
                        :id="item"
                    >
                        <component 
                            :is="item"
                            :isCurrent="current === item"
                            :isMobile="isMobile"
                            :isClient="isClient"
                            @scrollDown="scrollDown"
                            @showPopup="showPopup()"
                            @toStart="toStart()"
                        />
                    </div>
                </full-page>
            </div>
        </transition>
    </div>
</template>

<script>
import Login from '../components/Login.vue'
import Intro from '../components/Intro.vue'
import Bar from '../components/Bar.vue'
import Cinema from '../components/Cinema.vue'
import TopMerchants from '../components/TopMerchants.vue'
import Night from '../components/Night.vue'
import Taxi from '../components/Taxi.vue'
import Carsharing from '../components/Carsharing.vue'
import Cashback from '../components/Cashback.vue'
import BestMerchant from '../components/BestMerchant.vue'
import Share from '../components/Share.vue'
import Popup from '../components/Popup.vue'

import Vivus from 'vivus'

export default {
    name: 'client-page',
    components: {
        Popup, Login, Intro, Bar, Cinema, TopMerchants, Night, Taxi, Carsharing, Cashback, BestMerchant, Share
    },
    data () {
        return {
            loggedIn: false,
            popupVisible: false,
            current: 'intro',
            destination: 'down',
            options: {
                licenseKey: '',
                onLeave: this.onLeave,
                easing: 'linear',
                scrollSpeed: 800,
                fitToSectionDelay: 100,
            },
            taxiBg: null,
            sections: ['intro', 'night', 'bar', 'cashback', 'carsharing', 'taxi', 'best-merchant', 'cinema', 'top-merchants', 'share'],
            bgSections: ['share', 'top-merchants', 'cinema', 'best-merchant', 'taxi', 'carsharing', 'cashback', 'bar', 'night', 'intro']
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
        isClient() {
            return this.$store.getters.getClientStatus
        },
        currentIndex() {
            return this.bgSections.indexOf(this.current)
        },
    },
    watch: {
        current: function (newVal) {
            if (newVal === 'taxi') {
                this.taxiBg.play()
            } else {
                this.taxiBg.reset()
            }
        },
    },
    mounted() {
        if (this.isMobile) {
            this.taxiBg = new Vivus('taxiBg', { duration: 100, type: 'oneByOne', file: 'img/city-mobile.svg' })
        } else {
            this.taxiBg = new Vivus('taxiBg', { duration: 100, type: 'oneByOne', file: 'img/city-desktop.svg' })
        }
    },
    methods: {
        showPopup() {
            this.popupVisible = true
            this.disableScrolling()
        },
        hidePopup() {
            this.popupVisible = false
            this.enableScrolling()
        },
        goToStart() {
            this.$refs.fullpage.api.moveTo(1) 
        }, 
        onLoginSuccess() {
            this.loggedIn = true
        }, 
        onLeave(section, origin, destination) {
            this.destination = destination
            this.current = origin.item.getAttribute('id')
        },
        scrollDown() {
            this.$refs.fullpage.api.moveSectionDown() 
        },
        enableScrolling() {
            this.$refs.fullpage.api.setAllowScrolling(true)
        },
        disableScrolling() {
            this.$refs.fullpage.api.setAllowScrolling(false)
        },
    }
}
</script>

<style lang="scss">
.bg {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: opacity .1s linear;
    &.hidden {
        opacity: 0;
    }
}
.login-bg {
    overflow: hidden;
    background-blend-mode: normal, overlay, normal;
    &.orange {
        background-image: radial-gradient(562.44px at 66.74% 3.03%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%),
                        linear-gradient(232.43deg, #414141 36.74%, rgba(0, 0, 0, 0) 71.22%),
                        radial-gradient(1209.14px at 53.65% 0%, #FFAC33 0%, #FFD954);
        background-color: #FFD954;
        color: #000;

        .card-wrapper .card-img {
            margin-top: 187px;
        }

        @media(max-width: 800px) {
            background: radial-gradient(100% 100% at 53.65% 0%, #FFAC33 0%, #FFD954 100%);
        }
    }
}
.intro-bg {
    background-image: radial-gradient(701.97px at 53.65% 0%, #FFAC33 0%, #FFD954 100%);

    @media(max-width: 800px) {
        background: radial-gradient(100% 100% at 53.65% 0%, #FFAC33 0%, #FFD954 100%);
    }
}
.bar-bg {
    background-image: url('~@/assets/beer.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.cinema-bg {
    background-image: linear-gradient(136.16deg, #000000 22.69%, #78F515 93.64%);
    background-color: #000;
    overflow: hidden;
    .film-wrapper {
        transform: rotate3d(0, 0, 1, -27deg);
        opacity: .8;
        mix-blend-mode: overlay;
    }
    .film {
        opacity: 0;
        position: absolute;
        width: 136%;
        height: 376px;
        background-image: url('~@/assets/film-cropped.png');
        background-size: contain;
        background-repeat: repeat-x;
    }
    .animateFilm {
        opacity: 1;
        animation-name: animateFilm;
        animation-duration: 2s;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
    @keyframes animateFilm {
        0% {
            transform: translate3d(-348px, 0, 0);
        }
        100% {
            transform: translate3d(-696px, 0, 0);
        }
    }
}
.top-merchants-bg {
    background-image: url('~@/assets/buys-bg.jpg');
    background-size: cover;
    @media(max-width: 800px) {
        background-image: url('~@/assets/buys-bg-mobile.jpg');
    }
}
.night-bg {
    background-image: url('~@/assets/night-bg.jpg');
    background-size: cover;
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-image: url('~@/assets/mirror-ball-full.png');
        background-size: 71%;
        background-position: center;
        mix-blend-mode: screen;
        @media(max-width: 800px) {
            background-size: 120%;
        }
    }
}
.taxi-bg {
    background-image: url('~@/assets/taxi-desktop-bg.jpg');
    background-size: cover;
    @media(max-width: 800px) {
        background-image: url('~@/assets/taxi-bg.jpg');
    }
}
.carsharing-bg {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('~@/assets/carsharing-bg.jpg');
    .wheel {
        position: absolute;
        bottom: -308px;
        left: 128px;
        width: 616px;
        height: 616px;
        background-image: url('~@/assets/wheel.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: right bottom;
        mix-blend-mode: screen;
    }
    .spin {
        // animation: 3s spin linear infinite both;
    }
    @keyframes spin { 
        100% {
            -webkit-transform: rotate3d(0, 0, 1, 360deg); 
            transform: rotate3d(0, 0, 1, 360deg);
        } 
    }
}
.cashback-bg {
    background-image: url('~@/assets/cashback-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.best-merchant-bg {
    background-image: url('~@/assets/best-merchant-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.share-bg {
    background-image: radial-gradient(2861.00px at 19.27% 17.11%, #000000 0%, #940BFF 34.38%, #FC54FF 100%);
}
</style>
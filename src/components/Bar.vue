<template>
    <div class="screen beer-wrapper">
        <div class="content">
            <div :class="isMobile ? mobileLayout : desktopLayout">
                <div :class="isMobile ? '' : 'col-bigger'">
                    <h3>Вы выпили вооот столько</h3>
                    <div class="row no-margin justify-start delay-5" :class="isCurrent ? 'fadeInLeft' : ''">
                        <count-up 
                            class="huge-title"
                            :endVal="pintCount"
                            @ready="saveCounterInstance" />
                        <div class="beer-emoji"></div>
                    </div>
                    <p class="text paragraph-text" :class="isMobile ? '' : 'no-margin'">{{ declensed }} пива. А если считать в&nbsp;банках&nbsp;— столько&nbsp;же.</p>
                </div>

                <div :class="isMobile ? '' : 'col-smaller'">
                    <p class="text delay-5" :class="isCurrent ? 'fadeInUp' : ''">Потратили в барах</p>
                    <div class="row delay-8">
                        <count-up 
                                class="red" 
                                :class="isCurrent ? 'fadeInUp' : ''"
                                :endVal="barCount"
                                :options="{ separator: '&nbsp;',
                                            suffix: '&nbsp;₽'}"
                                            @ready="saveCounterInstance" />
                        <div class="counter-img cocktail-img"></div>
                    </div>

                    <p class="text delay-8" :class="isCurrent ? 'fadeInUp' : ''">Номинал пива</p>

                    <div class="row delay-9">
                        <count-up 
                                class="red" 
                                :class="isCurrent ? 'fadeInUp' : ''"
                                :endVal="pintPrice"
                                :options="{ separator: '&nbsp;',
                                            suffix: '&nbsp;₽'}"
                                            @ready="saveCounterInstance" />
                        <div class="counter-img beer-img"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countMixin from '@/mixins/countup'
import decl from '@/utils/decl'

export default {
	mixins: [
		countMixin,
    ],
    props: {
        isCurrent: {
            type: Boolean,
            default: false
        },
        isMobile: {
            type: Boolean,
            default: false
        },
        pintPrice: {
            type: Number,
            default: 280
        }
    },
    data () {
        return {
            mobileLayout: ['column'],
            desktopLayout: ['row', 'justify-start', 'align-center', 'no-margin']
        }
    },
    computed: {
        barCount() {
            return this.$store.state['bar_amount']
        },
        pintCount() {
            return Math.round(this.barCount / this.pintPrice) || 1
        },
        declensed() {
            return decl(this.pintCount, ['кружкa','кружки','кружек'])
        }
        
    },
}
</script>

<style lang="scss">
    .beer-wrapper {
        position: relative;
        .huge-title {
            margin-right: 21px;
            font-weight: 900;
            color: #FF3333;
            @media (min-width: 1890px) {
                font-size: 220.492px;
                line-height: 269px;
            }
            @media (min-width: 1310px) and (max-width: 1990px) {
                font-size: 8vw;
                line-height: 1;
            }
            @media (min-width: 800px) and (max-width: 1310px) {
                font-size: 6vw;
                line-height: 1;
            }
            @media (min-width: 414px) and (max-width: 800px) {
                margin-right: 0;
                font-size: 120.116px;
                line-height: 122px;
            }
            @media(max-width: 414px) {
                margin-right: 13px;
                font-size: 80px;
                line-height: 1;
            }
        }
        .beer-emoji {
            background: url('~@/assets/beer-emoji.png');
            background-size: cover;
            background-repeat: no-repeat;

            @media (min-width: 1890px) {
                width: 166px;
                height: 166px;
            }
            @media (min-width: 1310px) and (max-width: 1990px) {
                width: 8vw;
                height: 8vw;
            }
            @media (min-width: 800px) and (max-width: 1310px) {
                width: 6vw;
                height: 6vw;
            }
            @media (min-width: 414px) and (max-width: 800px) {
                width: 106.99px;
                height: 106.99px;
            }
            @media(max-width: 414px) {
                width: 80px;
                height: 80px;
            }
        }
        .row {
            @media (min-width: 414px) and (max-width: 800px) {
                margin-bottom: 30px;
            }
            @media(max-width: 414px) {
                margin-bottom: 0;
            }
        }
        .text {
            font-size: 24px;
            line-height: 29px;
            color: #FFFFFF;
            font-weight: 500;

            @media (min-width: 800px) {
                margin-bottom: 25px;
            }
            @media(max-width: 414px) {
                font-size: 21px;
                line-height: 23px;
                margin-bottom: 10px;
            }
        }
        .text.paragraph-text {
            @media(max-width: 414px) {
                margin-bottom: 16px;
            }
        }
        .red {
            font-size: 42.8411px;
            line-height: 52px;
            color: #FF3333;
            font-weight: 900;
            @media(max-width: 375px) {
                font-size: 30px;
            }
        }
        .counter-img {
            display: inline-block;
            width: 44px;
            height: 44px;
            margin-left: 15px;
            background-size: cover;
            background-repeat: no-repeat;
            vertical-align: top;
        }
        .cocktail-img {
            background-image: url('~@/assets/cocktail.png');
        }
        .beer-img {
            background-image: url('~@/assets/pivasique.png');
        }
        .counter {
            margin-bottom: 50px;
        }
    }
</style>

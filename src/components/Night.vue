<template>
    <div class="screen night-wrapper">
        <div class="content">
            <div :class="isMobile ? 'column' : 'row'">
                <div :class="isMobile ? '' : 'col-bigger'">
                    <h3>Тратили от заката до&nbsp;рассвета</h3>
                    <div class="title delay-5" :class="isCurrent ? 'fadeInLeft' : ''">{{ nightDate }}</div>
                </div>
                <div :class="isMobile ? '' : 'col-smaller'">
                    <div class="delay-5" :class="isCurrent ? 'fadeInUp' : ''">
                        <p class="text paragraph-text">И потратили на своё веселье в&nbsp;барах, кафе и&nbsp;ресторанах</p>
                        <div class="row align-center">
                            <count-up class="blue champagne-counter"
                                    :endVal="nightSum"
                                    :options="{ separator: '&nbsp;',
                                                suffix: '&nbsp;₽'}"
                                                @ready="saveCounterInstance" />
                            <div class="champagne-img"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countMixin from '@/mixins/countup'
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
        }
    },
    computed: {
        nightDate() {
            return this.$store.state['best_night_date']
        },
        nightSum() {
            return this.$store.state['best_night_amount']
        },
    },
}
</script>

<style lang="scss">
    .night-wrapper {
        .row {
            margin-bottom: 0;
        }
        .title {
            font-weight: 900;
            color: #54F5FF;
            @media(min-width: 800px) {
                font-size: 6vw!important;
                line-height: 4vw!important;
            }
            @media(max-width: 375px) {
                margin-bottom: 0;
            }
        }
        .blue {
            margin-right: 20px;
            font-size: 42.8411px;
            line-height: 52px;
            font-weight: 900;
            color: #54F5FF;
            @media(max-width: 414px) {
                font-size: 30px;
            }
        }
        .champagne-img {
            width: 62px;
            height: 62px;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url('~@/assets/champagne.png');
        }
        .paragraph-text {
            @media(max-width: 414px) {
                margin-bottom: 16px;
            }
        }
        .text {
            margin-bottom: 26px;
            margin-top: 30px;
            font-size: 24px;
            line-height: 29px;
            color: #FFFFFF;
            font-weight: 500;
            @media(max-width: 414px) {
                font-size: 21px;
                line-height: 23px;
                margin-bottom: 6px;
            }
        }
    }
</style>

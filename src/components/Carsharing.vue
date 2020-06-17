<template>
    <div class="screen carsharing-wrapper">
        <div class="content">
            <div :class="isMobile ? mobileLayout : desktopLayout">
                <div :class="isMobile ? '' : 'col-bigger'">
                    <div>
                        <h3>За рулём каршеринга вы&nbsp;провели</h3>

                        <div class="">
                            <div class="title huge-title delay-5" :class="isCurrent ? 'fadeInLeft' : ''">
                                <count-up
                                        :delay="500"
                                        :endVal="duration"
                                        :options="{ separator: '&nbsp;'}"
                                                    @ready="saveCounterInstance" />
                            </div>
                            <p class="subtitle">{{ declensed }}</p>
                        </div>
                    </div>
                </div>
                <div :class="isMobile ? '' : 'col-smaller'">
                    <div class="delay-5" :class="isCurrent ? 'fadeInUp' : ''">
                        <p class="text">Бюджет</p>
                        <div class="row">
                            <count-up class="yellow"
                                    :endVal="tripSum"
                                    :options="{ separator: '&nbsp;',
                                                suffix: '&nbsp;₽'}"
                                                @ready="saveCounterInstance" />
                            <div class="cash-img"></div>
                        </div>
                    </div>

                    <div class="delay-8" :class="isCurrent ? 'fadeInUp' : ''">
                        <!-- <p class="text">Средняя стоимость минуты</p> -->
                        <p class="text">Номинал минуты</p>
                        <div class="row align-top justify-start no-margin">
                            <count-up class="yellow"
                                    :endVal="minutePrice"
                                    :options="{ separator: '&nbsp;',
                                                suffix: '&nbsp;₽'}"
                                                @ready="saveCounterInstance" />
                            <div class="clocks-img"></div>
                        </div>
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
        minutePrice: {
            type: Number,
            default: 8
        }
    },
    data () {
        return {
            mobileLayout: ['column'],
            desktopLayout: ['row', 'justify-start', 'no-margin']
        }
    },
    computed: {
        tripSum() { 
            return Math.round(this.$store.state['carshare_amount'])
        }, 
        duration() {
            return Math.round(this.tripSum / this.minutePrice) || 1
        },
        declensed() {
            return decl(this.cashback, ['минуту','минуты','минут'])
        }
    },
    mounted() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .carsharing-wrapper {
        position: relative;
        .title.huge-title {
            margin-bottom: 0;            
            color: #FAFF00;

            @media(min-width: 800px) {
                font-size: 8vw;
                line-height: 9vw;
            }
        }
        .subtitle {
            font-size: 4vw;
            line-height: 1vw;
            font-weight: 900;
            color: #FAFF00;
            @media(max-width: 800px) {
                font-size: 9vw;
                margin-bottom: 9vw;
            }
        }
        .row {
            @media(max-width: 414px) {
                margin-bottom: 0;
            }
        }
        .yellow {
            margin-right: 20px;
            font-size: 42.8411px;
            line-height: 52px;
            font-weight: 900;
            color: #FAFF00;
            @media(max-width: 414px) {
                font-size: 30px;
            }
        }
        .col-smaller .text {
            margin-bottom: 25px;
        }
        .text {
            color: #FFFFFF;
            font-weight: 500;
            @media(max-width: 414px) {
                font-size: 21px;
                line-height: 23px;
                margin-bottom: 6px;
            }
        }
        .cash-img {
            width: 49px;
            height: 49px;
            margin-left: 15px;
            background-size: cover;
            background-repeat: no-repeat;
            vertical-align: top;
            background-image: url('~@/assets/cash-icon.png');
        }
        .clocks-img {
            width: 38px;
            height: 38px;
            margin-left: 23px;
            background-size: cover;
            background-repeat: no-repeat;
            vertical-align: -4px;
            background-image: url('~@/assets/clocks.png');
        }
    }
</style>

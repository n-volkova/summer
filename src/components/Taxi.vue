<template>
    <div class="screen taxi-wrapper">
        <div class="content" :class="isMobile ? mobileLayout : desktopLayout">
            <div :class="isMobile ? '' : 'col-bigger'">
                <h3>обсуждали с таксистом его&nbsp;бизнес, проехав</h3>
                <div class="delay-5" :class="isCurrent ? 'fadeInLeft' : ''">
                    <count-up class="title"
                                :endVal="distance"
                                :options="{ separator: '&nbsp;',
                                            suffix: '&nbsp;км'}"
                                @ready="saveCounterInstance" />
                </div>
            </div>
            <div :class="isMobile ? '' : 'col-smaller'">
                <div class="delay-5" :class="isCurrent ? 'fadeInUp' : ''">
                        <p class="text">Сумма трат на такси</p>
                        <div class="row">
                            <count-up class="green"
                                :endVal="wasted"
                                :options="{ separator: '&nbsp;',
                                            suffix: '&nbsp;₽'}"
                                @ready="saveCounterInstance" />
                            <div class="wasted-img"></div>
                        </div>
                    </div>

                    <div class="delay-8" :class="isCurrent ? 'fadeInUp' : ''">
                        <p class="text">Номинал километра</p>
                        <div class="row align-top justify-start no-margin">
                            <count-up class="green"
                                    :endVal="kmPrice"
                                    :options="{ separator: '&nbsp;',
                                                suffix: '&nbsp;₽'}"
                                                @ready="saveCounterInstance" />
                            <div class="cash-img"></div>
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
        },
        kmPrice: {
            type: Number,
            default: 30
        },
    },
    data () {
        return {
            mobileLayout: ['column'],
            desktopLayout: ['row', 'justify-start', 'no-margin']
        }
    },
    computed: {
        wasted() {
            return Math.round(this.$store.state['taxi_amount'])
        }, 
        distance() {
            return Math.round(this.wasted / this.kmPrice) || 1
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .taxi-wrapper {
        .title {
            font-weight: 900;
            color: #00FF19;
            @media(min-width: 800px) {
                font-size: 6vw;
                line-height: 9vw;
            }
            @media(max-width: 450px) {
                font-size: 40px;
                line-height: 67px;
                margin-bottom: 0;
            }
        }
        .row {
            @media(max-width: 414px) {
                margin-bottom: 0;
            }
        }
        .text {
            margin-bottom: 25px;
            color: #FFFFFF;
            font-weight: 500;
            @media(max-width: 450px) {
                // margin-bottom: 0;
                font-size: 21px;
                line-height: 23px;
                margin-bottom: 6px;
            }
        }
        .green {
            margin-right: 20px;
            font-size: 42.8411px;
            line-height: 52px;
            font-weight: 900;
            color: #00FF19;

            @media(max-width: 450px) {
                font-size: 30px;
            }
        }
        .wasted-img {
            margin-left: 5px;
            width: 66px;
            height: 66px;
            margin-left: 15px;
            background-size: cover;
            background-repeat: no-repeat;
            vertical-align: text-bottom;
            background-image: url('~@/assets/taxi.png');
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
    }
</style>

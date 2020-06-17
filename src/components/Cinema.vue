<template>
    <div class="screen cinema-wrapper">
        <div class="content">
            <div :class="isMobile ? mobileLayout : desktopLayout">
                <div :class="isMobile ? '' : 'col-bigger'">
                    <h3>Сидели на последнем или любом другом ряду</h3>
                    <div class="delay-5" :class="isCurrent ? 'fadeInLeft' : ''">
                        <count-up class="title"
                                :delay="300"
                                :endVal="filmCount"
                                :options="{ separator: '&nbsp;',
                                            suffix: filmCountSuffix}"
                                @ready="saveCounterInstance" />
                    </div>
                </div>
                
                <div :class="isMobile ? '' : 'col-smaller'">
                    <div class="delay-5" :class="isCurrent ? 'fadeInUp' : ''">
                        <p class="text">Потратили на билеты</p>
                        <div class="row align-top justify-start">
                            <count-up class="green"
                                    :delay="500"
                                    :endVal="cinemaAmount"
                                    :options="{ separator: '&nbsp;',
                                                suffix: '&nbsp;₽'}"
                                                @ready="saveCounterInstance" />
                            <div class="cash-row"></div>
                        </div>
                    </div>

                    <div class="delay-8" :class="isCurrent ? 'fadeInUp' : ''">
                        <p class="text">Номинал билета</p>
                        <div class="row align-top justify-start no-margin">
                            <count-up class="green"
                                    :delay="800"
                                    :endVal="ticketPrice"
                                    :options="{ separator: '&nbsp;',
                                                suffix: '&nbsp;₽'}"
                                                @ready="saveCounterInstance" />
                            <div class="ticket-row"></div>
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
        ticketPrice: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            mobileLayout: ['column'],
            desktopLayout: ['row', 'justify-start', 'align-center', 'no-margin']
        }
    },
    computed: {
        cinemaAmount() {
            return Math.round(this.$store.state['cinema_amount']) 
        }, 
        filmCount() {
            return Math.round(this.cinemaAmount / this.ticketPrice) || 1
        },
        filmCountSuffix() {
            return decl(this.filmCount, [' раз!',' раза!',' раз!'])
        }
    }
}
</script>

<style lang="scss">
    .cinema-wrapper {
        .title {
            margin-right: 21px;
            font-weight: 900;
            color: #52FF00;

            @media(min-width: 800px) {
                font-size: 7vw;
                line-height: 158px;
            }
            @media(max-width: 414px) {
                margin-bottom: 0;
                font-size: 36px;
                line-height: 2;
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
            @media(max-width: 414px) {
                font-size: 21px;
                line-height: 23px;
                margin-bottom: 6px;
            }
        }
        .green {
            margin-right: 20px;
            font-size: 42.8411px;
            line-height: 52px;
            color: #52FF00;
            font-weight: 900;
            @media(max-width: 414px) {
                font-size: 30px;
            }
        }
        .cash-row {
            width: 209px;
            height: 50px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url('~@/assets/cash-row.png');
            background-position: center;

            @media(max-width: 800px) {
                width: 139px;
            }
        }
        .ticket-row {
            width: 219px;
            height: 52px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url('~@/assets/ticket-row.png');
            background-position: center;

            @media(max-width: 800px) {
                width: 140px;
            }
        }
    }
</style>

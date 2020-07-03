<template>
    <div class="screen cashback-wrapper">
        <div class="content">
            <div :class="isMobile ? 'column' : 'row'">
                <div :class="isMobile ? '' : 'col-bigger'">
                    <h3>Пока все отдыхали, вы&nbsp;заработали</h3>
                    <div class="">
                        <div class="title huge-title delay-5" :class="isCurrent ? 'fadeInLeft' : ''">
                            <count-up
                                    :delay="300"
                                    :endVal="cashback"
                                    :options="{ separator: '&nbsp;' }"
                                                @ready="saveCounterInstance" />
                            </div>
                        </div>
                        <p class="subtitle">{{ declensed }}</p>
                    </div>
                <div class="pig delay-8" :class="isCurrent ? 'fadeInDown' : ''"></div>
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
        }
    },
    computed: {
        cashback() {
            return Math.round(this.$store.state['cashback'])
        },
        declensed() {
            return decl(this.cashback, ['рокетрубль','рокетрубля','рокетрублей'])
        }
    },
}
</script>

<style lang="scss">
    .cashback-wrapper {
        .row {
            margin-bottom: 0;
            justify-content: space-between;
        }
        .column {
            justify-content: flex-start;
        }
        .pig {
            width: 45%;
            height: 30vw;
            background-image: url('~@/assets/pig.png');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;

            @media(min-width: 500px) and (max-width: 800px) {
                width: 100%;
                height: 277px;
            }
            @media(max-width: 500px) {
                width: 100%;
                height: 192px;
            }
        }
       .title.huge-title {
            margin-bottom: 0;            
            color: #FFE600;

            @media(min-width: 800px) {
                font-size: 130px;
                line-height: 158px;
            }
            @media (max-width: 800px) {
                font-size: 50px;
                line-height: 1.5;
            }
        }
        .subtitle {
            font-size: 4vw;
            line-height: 1vw;
            font-weight: 900;
            color: #FFE600;
            @media(max-width: 800px) {
                font-size: 43px;
                margin-bottom: 43px;
            }
        }
        .text {
            font-size: 24px;
            line-height: 29px;
            color: #FFFFFF;
            font-weight: 500;
        }
    }
</style>

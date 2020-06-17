<template>
    <div class="screen big-buys-wrapper">
        <div :class="isMobile ? mobileLayout : desktopLayout" class="content">
            <div class="huge-title delay-5" :class="isCurrent ? 'fadeInUp' : ''">
                самые<br>
                крупные<br>
                покупки
            </div>
            <div class="buys" v-if="merchants.length">
                <div v-for="(merchant, index) in merchants"
                    :key="index"
                    :ref="`merchant${index}`"
                    class="merchant" 
                    :class="[`delay-${index + 5}`,
                            `merchant-${index + 1}`,
                        {
                            'fadeInRight': isCurrent,
                            'glow': isCurrent,
                        }]"
                    :style="hasIcon(merchant.icon) ? `background-image: url('/img/merchants/${merchant.icon}')` : ''"
                    :content="`${merchant.name} ${formatNumber(merchant.amount)}&nbsp;₽`" 
                    v-tippy="{ appendTo: 'parent', 
                                size: 'large',
                                trigger: isMobile ? 'click' : 'mouseenter focus' }">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tooltipsVisible: false,
            mobileLayout: ['column', 'justify-evenly'],
            desktopLayout: ['row', 'no-margin'],
        }
    },
    props: {
        isCurrent: {
            type: Boolean,
            default: false
        },
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        merchants() {
            return this.$store.getters.getTopMerchants
        },
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat('ru-RU').format(Math.round(number))
        },
        hasIcon(icon) {
            return icon !== 'null' || icon !== null
        },
    }
}
</script>

<style lang="scss">
    .big-buys-wrapper {
        height: 100%;
        .huge-title {
            width: 65%;
            margin-right: 5%;
            font-size: 8vw;
            line-height: 92.1%;
            color: #FAFF00;
            font-weight: 900;
            pointer-events: none;

            @media(min-width: 414px) and (max-width: 800px) {
                margin-bottom: 20px;
                width: 100%;
                font-size: 73.1884px;
                line-height: 92.1%;
            }

            @media(max-width: 450px) {
                font-size: 50px;
            }
        }
        .buys {
            position: relative;
            width: 35%;
            height: 470px;
            @media (min-width: 414px) and (max-width: 800px) {
                width: 258px;
                height: 270px;
                margin: 0 auto;
            }
            @media(max-width: 414px) {
                height: 193px;
                width: 248px;
                margin: 0 auto;
            }
            .merchant {
                position: absolute;
                border-radius: 50%;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url('~@/assets/default-merchant.png');
                cursor: pointer;
                outline: none;
            }
            .merchant-1 {
                top: 0px;
                width: 236px;
                height: 236px;
                @media(max-width: 800px) {
                    top: 0;
                    left: 0;
                    width: 144px;
                    height: 144px;
                }
                @media(max-width: 450px) {
                    width: 114px;
                    height: 114px;
                }
            }
            .merchant-2 {
                top: 100px;
                left: 260px;
                width: 159px;
                height: 159px;
                @media (min-width: 414px) and (max-width: 800px) {
                    width: 97px;
                    height: 97px;
                    top: 4px;
                    left: 156px;
                }
                @media(max-width: 414px) {
                    width: 87px;
                    height: 87px;
                    top: 14px;
                    left: 159px;
                }
            }
            .merchant-3 {
                top: 296px;
                left: 219px;
                
                width: 112px;
                height: 112px;
                @media(max-width: 800px) {
                    width: 68px;
                    height: 68px;
                    top: 118px;
                    left: 133px;
                }
            }
            .merchant-4 {
                top: 356px;
                left: 113px;
                width: 82px;
                height: 82px;
                @media(max-width: 800px) {
                    width: 50px;
                    height: 50px;
                    top: 161px;
                    left: 73px;
                }
            }
            .glow {
                animation: glow .9s ease-in-out 1s 2 both;
            }
                
            @keyframes glow {
                0% { box-shadow: 0 0 -10px #fff; }
                40% { box-shadow: 0 0 20px #fff; }
                60% { box-shadow: 0 0 20px #fff; }
                100% { box-shadow: 0 0 -10px #fff; }
            }
        }
    }
</style>

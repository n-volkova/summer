<template>
    <div class="screen most-visited-wrapper">
        <div :class="isMobile ? mobileLayout : desktopLayout" class="content">
            <div :class="isMobile ? '' : 'col-bigger'">
                <h3>Были любимым покупателем в</h3>
                <div class="title delay-5" :class="isCurrent ? 'fadeInLeft' : ''" v-html="place" />
                <p class="text delay-8" :class="isCurrent ? 'fadeInLeft' : ''">{{ transactionCount }} {{ declensed }} </p>
            </div>
            <div class="merchant-circles">
                <div 
                    class="circle small-circle delay-5" 
                    :class="{
                        'fadeIn': isCurrent,
                        'default-icon': noIcon 
                    }"
                    :style="noIcon || `background-image: url(${merchantIcon})`">
                </div>
                <div 
                    class="circle medium-circle delay-6" 
                    :class="{
                        'fadeIn': isCurrent,
                        'default-icon': noIcon 
                    }"
                    :style="noIcon || `background-image: url(${merchantIcon})`">
                </div>
                <div 
                    class="circle large-circle delay-7" 
                    :class="{
                        'fadeIn': isCurrent,
                        'default-icon': noIcon 
                    }"
                    :style="noIcon || `background-image: url(${merchantIcon})`">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import decl from '@/utils/decl'
export default {
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
    data () {
        return {
            mobileLayout: ['column', 'justify-evenly'],
            desktopLayout: ['row', 'justify-between', 'no-margin', 'align-center']
        }
    },
    computed: {
        place() {
            return this.$store.state['best_merchant'].name
        }, 
        transactionCount() {
            return this.$store.state['best_merchant'].count
        }, 
        merchantIcon() {
            return this.$store.state['best_merchant'].icon
        },
        noIcon() {
            return this.$store.state['best_merchant'].icon === 'null' || this.$store.state['best_merchant'].icon === null
        },
        declensed() {
            return decl(this.transactionCount, ['транзакция','транзакции','транзакций'])
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .most-visited-wrapper {
        .row {
            margin-bottom: 0;
        }
        .title {
            font-size: 5vw;
            line-height: 7vw;
            font-weight: 900;
            color: #4EE670;
            margin-bottom: 2vw;
            @media(max-width: 800px) {
                font-size: 10vw!important;
                line-height: 1!important;
            }
        }
        .col-bigger {
            width: 77%;
        }
        .text {
            color: #FFFFFF;
            font-weight: 500;
        }
        .merchant-circles {
            position: relative;
            width: 28%;
            height: 358px;
            @media(min-width: 450px) and (max-width: 1500px) {
                transform: scale(.6);
            }
            @media(max-width: 450px) {
                width: 280px;
                margin: 0 auto;
                height: 200px;
            }
            .circle {
                position: absolute;
                background-size: contain;
                background-repeat: no-repeat;
                border-radius: 50%;
                border-style: solid;
                border-color: #fff;
                &.default-icon {
                    border: none;
                    background-image: url('~@/assets/default-merchant.png')
                }
            }
            .small-circle {
                width: 191px;
                height: 191px;
                bottom: 0;
                left: 0;
                z-index: 1;
                border-width: 26px;
                @media(max-width: 450px) {
                    width: 90px;
                    height: 90px;
                    border-width: 20px;
                }
            }
            .medium-circle {
                width: 250px;
                height: 250px;
                bottom: 29px;
                left: 47px;
                z-index: 2;
                border-width: 36px;
                @media(max-width: 450px) {
                    width: 120px;
                    height: 120px;
                    top: 58px;
                    left: 50px;
                    border-width: 26px;
                }
            }
            .large-circle {
                width: 283px;
                height: 283px;
                bottom: 73px;
                left: 119px;
                z-index: 3;
                border-width: 40px;
                @media(max-width: 450px) {
                    width: 160px;
                    height: 160px;
                    top: 0;
                    left: auto;
                    right: 0;
                    border-width: 30px;
                }
            }
        }
    }
</style>

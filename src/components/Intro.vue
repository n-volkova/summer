<template>
    <div class="screen intro-wrapper">
        <div class="sun" :class="isCurrent ? 'rotate' : 'fadeOut'"></div>
        <div :class="isMobile ? mobileLayout : desktopLayout" class="content">
            <div class="huge-title delay-5" :class="isCurrent ? 'fadeInLeft' : ''">Это лето не&nbsp;вернуть уже&nbsp;— мы&nbsp;знаем, но&nbsp;всегда можно вспомнить, как&nbsp;это&nbsp;было</div>
        </div>
        <div class="chevron-down delay-8" :class="isCurrent ? 'bounceInDown' : ''" @click="$emit('scrollDown')" ></div>
    </div>
</template>

<script>
export default {
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
    data () {
        return {
            mobileLayout: [''],
            desktopLayout: ''
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    .intro-wrapper {
        .sun {
            position: absolute;
            width: 1024px;
            height: 1024px;
            top: -203px;
            right: -331px;
            background-image: url('~@/assets/intro-sun.png');
            background-size: contain;
            background-repeat: no-repeat;
            will-change: transform;

            @media(max-width: 800px) {
                top: 0;
                left: 0;
                width: 100%;
                height: 370px;
                background-position: center;
                background-image: url('~@/assets/login-sun.png');
            }
        }
        .chevron-down {
            position: absolute;
            width: 44px;
            height: 24px;
            bottom: 40px;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            background-image: url('~@/assets/down.svg');
            background-size: contain;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        .huge-title {
            width: 90%;
            font-size: 70.4348px;
            line-height: 65px;
            font-weight: 900;
            color: #FFF;
            &.client-title {
                width: 100%;
            }
            @media(max-width: 800px) {
                position: absolute;
                width: 100%;
                left: 0;
                right: 0;
                padding: 0 6%;
                bottom: 84px;
                font-size: 48px;
                line-height: 95.21%;
            }
            @media(max-width: 375px) {
                font-size: 7vh;
            }
        }
    }
</style>

<template>
  <div id="app"><router-view /></div>
</template>

<script>
 
export default {
    name: 'app',
}

</script>

<style lang="scss">

@import './styles/fonts.scss';
@import './styles/main.scss';
@import './styles/animations.scss';

#app {
    position: relative;
}
.screen {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
        font-size: 1.5vw;
        line-height: 2vw;
        letter-spacing: 0.09em;
        margin-bottom: 1.5vw;
        text-transform: uppercase;
        font-weight: 900;
        color: #fff;
    }
    .text {
        font-size: 1.6vw;
        line-height: 1.5vw;
    }

    @media(max-width: 800px) {
        padding-top: 85px;
        justify-content: start;
        .title {
            margin-bottom: 7vw;
            display: inline-block;
            font-size: 64px;
            line-height: 1.2;
        }
        h3 {
            font-size: 7vw;
            line-height: 7vw;
        }
        .text {
            margin-bottom: 15px;
            font-size: 6vw;
            line-height: 6vw;
        }
    }
    @media(max-width: 450px) {
        padding-top: 45px;
    }
}
.content.absolute {
    left: 0;
    right: 0;
    height: 100%;
}
.title {
    font-weight: 900;
}
.text {
    &.no-margin {
        margin-bottom: 0;
    }
}
.col-2 {
    width: 50%;
}
.col-3 {
    width: 33%;
    @media (min-width: 880px) {
        margin-right: 20px;
    }
}
.col-bigger {
    width: 55%;
    margin-right: 5%;
}
.col-smaller {
    width: 40%;
}
header {
    position: fixed;
    width: 100%;
    padding-top: 49px;
    z-index: 2;
    &.fixed {
        position: fixed;
    }
    @media (max-width: 880px) {
        position: absolute;
        padding-top: 33px;
    }
    .content {
        width: 100%;
        padding-left: 2vw;
        padding-right: 2vw;
        margin-left: 0;
        margin-right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 880px) {
            padding-left: 6%;
            padding-right: 6%;
        }
    }
    .logo {
        display: flex;
        align-items: center;
    }
    .logo__img {
        width: 52px;
        height: 52px;
        margin-right: 9px;
        background-image: url('~@/assets/logo.svg');
        background-size: contain;
        background-repeat: no-repeat;
        @media (max-width: 375px) {
            width: 40px;
            height: 40px;
        }
    }
    .logo__text {
        font-size: 26px;
        color: #fff;
        font-weight: 600;
        @media (max-width: 375px) {
            font-size: 22px;
        }
    }
    .share {
        width: 173px;
        height: 49px;
        left: 1220px;
        top: 48px;
        background-color: rgba(0, 0, 0, .3);
        border-radius: 99px;
        color: #fff;
        font-size: 18px;
        line-height: 49px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        transform-origin: 0 0;
        &.active {
            background-color: rgba(255, 255, 255, .4);
        }
        &.mobile-share {
            width: 52px;
            height: 52px;
            background-image: url('~@/assets/mobile-share.svg');
            background-size: contain;
            background-repeat: no-repeat;
            @media (max-width: 375px) {
                width: 40px;
                height: 40px;
            }
        }
    }
}
.content {
    width: auto;
    margin-right: 280px;
    margin-left: 280px;
    &.absolute {
        position: absolute;
    }
    &.overflow-hidden {
        overflow: hidden;
    }
    @media (max-width: 880px) {
        width: 100%;
        height: 100%;
        padding-left: 6%;
        padding-right: 6%;
        margin-left: 0;
        margin-right: 0;
    }
}
</style>

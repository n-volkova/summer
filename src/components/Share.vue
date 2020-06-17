<template>
    <div class="bg-wrapper violet">
        <div class="content">
            <div class="title huge-title">Ну вот как-то так! ❤️</div>
            <p class="text">Поделитесь воспоминаниями с друзьями</p>
            <div class="share-btn-big delay-5" :class="isCurrent ? 'fadeInUp' : ''" @click="$emit('showPopup')">Поделиться</div>
        </div>
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
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.violet {
    color: #fff;
    @media(max-width: 375px) {
        // min-height: 100%;
    }
    .get-card {
        margin-top: 20px;
        font-weight: 700;
        color: #FA34E3;
    }
    .huge-title {
        margin-bottom: 21px;
        margin-top: 252px;
        font-size: 6vw;
        line-height: 7vw;
        font-weight: 900;
        text-align: center;
        @media(max-width: 800px) {
            margin-top: 120px;
            font-size: 48px;
            line-height: 101.3%;
        }
    }
    .text {
        margin-bottom: 73px;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        font-weight: 600;
        @media(max-width: 800px) {
            margin-bottom: 30px;
        }
    }
    .share-btn-big {
        margin: 0 auto 100px;
        width: 356px;
        height: 7vw;
        background-color: rgba(0, 0, 0, .3);
        border-radius: 99px;
        padding: 0 20px;
        color: #fff;
        font-size: 2vw;
        line-height: 7vw;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        @media(max-width: 800px) {
            width: 100%;
            margin-bottom: 40px;
            font-size: 6vw;
            height: 19vw;
            line-height: 19vw;
        }
    }
}
.visitor-page {
    .violet .huge-title {
        @media(min-width: 800px) {
            font-size: 75px;
            line-height: .9;
        }
        @media(max-width: 800px) {
            margin-top: 50px;
        }
        text-align: left;
    }
    .violet .content {
        @media (max-width: 1600px) {
            margin-right: 30px;
        }
    }
    .content {
        @media(max-width: 375px) {
            padding-top: 1px;
        }
    }
    .disclaimer {
        margin-bottom: 90px;
    }
    .regular-text {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 20px;
    }
    .regular-text.huge-text {
        font-size: 48px;
        line-height: 101.3%;
        font-weight: 900;
        @media(min-width: 800px) {
            font-size: 75px;
            line-height: .9;
        }
    }
    .license {
        @media(max-width: 375px) {
            margin-bottom: 172px;
        }
    }
}
</style>
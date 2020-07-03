<template>
    <div class="popup-shadow">
        <div class="vertical-align">
            <div class="content" :class="step">
                <div class="close" @click="hidePopup"></div>
                <div class="back" @click="chooseScreen"></div>

                <div v-show="step === 'choose-screen'">
                    <div class="title">Чем будем делиться?</div>
                    <div v-if="shareableScreens.length" class="options">
                        <div 
                            v-for="(item, index) in shareableScreens" 
                            :key="index" 
                            class="option"
                            :class="item.visible ? 'visible' : ''"
                            @click="toggleVisible(index)" >
                                {{ item.title }}
                        </div>
                    </div>
                    <div class="get-link" :class="noneChecked ? 'disabled' : ''" @click="chooseSocial">
                        Получить ссылку
                    </div>
                </div>

                <div v-show="step === 'choose-social'">
                    <div class="title">где будем делиться?</div>
                    <div class="link-field">
                        <input 
                            id="link" 
                            class="share-link" 
                            type="text" 
                            readonly 
                            :value="link" />
                        <div class="clipboard tooltip" @click="copyLink">
                            <div class="tooltip-text"> {{ clipboardTooltip }} </div>
                        </div>
                    </div>
                    <div class="shares">
                        <a :href="shareFb" @click="shareClick('fb')" target="_blank">
                            <img src="../assets/share-fb.png">
                        </a>
                        <a :href="shareVk" @click="shareClick('vk')" target="_blank">
                            <img src="../assets/share-vk.png">
                        </a>
                        <a :href="shareTw" @click="shareClick('tw')" target="_blank">
                            <img src="../assets/share-tw.png">
                        </a>
                    </div>
                    <transition name="fade">
                        <div class="delete-link" @click="deleteLink">{{ deleteLinkCaption }}</div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shares from '@/mixins/shares'

export default {
    name: 'Popup',

	mixins: [
		shares
    ],
    
    data () {
        return {
            step: 'choose-screen',
            fetching: false,
            deleting: false,
            clipboardTooltip: 'Скопировать'
        }
    },

    computed: {
        token() {
            return this.$store.getters.getToken
        },
        pages() {
            return this.$store.getters.getPages
        },
        link() {
            return `n-martynova.github.io/summer/`
        },
        hash_key() {
            return this.$store.getters.getHash
        },
        shareableScreens() {
            return this.$store.getters.getShareableScreens
        },
        deleteLinkCaption() {
            return this.deleting ? 'Ссылка удалена!' : 'Удалить ссылку'
        },
        noneChecked() {
            return !this.pages.length
        }
    },
    
    methods: {
        hidePopup() {
            this.$emit('hidePopup')
        },

        toggleVisible(index) {
            this.$store.commit('TOGGLE_SCREEN_VISIBILITY', index)
        },

        chooseSocial() {
            this.step = 'choose-social'
            // this.getLink(this.pages)
        },

        async getLink(pages = []) {
            this.fetching = true
            
            const patchUrl = `https://mw.rocketbank.ru/api/v1/summer2019/shares/${this.hash_key}`

            const data = {
                pages: pages,
                token: this.token
            }
            await this.$http({
                url: patchUrl,
                data: data,
                method: 'PATCH'
            }).then(res => {
                console.log('success')
            })
            .catch(error => {
            })
            
            this.fetching = false
        },

        chooseScreen() {
            this.step = 'choose-screen'
        },

        copyLink() {
            let clipboardBtn = document.querySelector('.clipboard')
            let shareLink = document.getElementById('link')

            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                var oldContentEditable = shareLink.contentEditable,
                    oldReadOnly = shareLink.readOnly,
                    range = document.createRange()

                shareLink.contentEditable = true
                shareLink.readOnly = false
                range.selectNodeContents(shareLink)

                var s = window.getSelection()
                s.removeAllRanges()
                s.addRange(range)

                shareLink.setSelectionRange(0, 999999) // A big number, to cover anything that could be inside the element.

                shareLink.contentEditable = oldContentEditable
                shareLink.readOnly = oldReadOnly
            } else {
                shareLink.select()
            }
            document.execCommand('copy')
            this.gtag('share link copied')

            this.clipboardTooltip = 'Скопировано!'
            
            clipboardBtn.addEventListener('mouseout', () => {
                this.clipboardTooltip = 'Скопировать'
            })
        },

        deleteLink() {
            // this.getLink().then(() => {
                this.deleting = true

                setTimeout(() => {
                    this.hidePopup()
                    this.deleting = false
                }, 500)
            // })
        },

        gtag: name => {
			if (process.env.NODE_ENV === 'development') console.log('gtag:', name)

			if (window.gtag) gtag('event', name)
		},
    }
}
</script>

<style lang="scss">
    .popup-shadow {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.516);
        z-index: 3;
        .vertical-align {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .content {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 540px;
            padding: 50px;
            background: #FFFFFF;
            border-radius: 20px;
            transition: height .3s ease-out;

            @media(max-width: 800px) {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%!important;
                border-radius: unset;

                padding: 60px 20px !important;
            }
        }
        .close {
            position: absolute;
            top: 36px;
            right: 33px;
            width: 16px;
            height: 16px;
            background-image: url('~@/assets/close.svg');
            background-repeat: no-repeat;
            background-size: cover;
            cursor: pointer;
        }
        .back {
            position: absolute;
            top: 34px;
            left: 33px;
            width: 19px;
            height: 20px;
            background-image: url('~@/assets/back.svg');
            background-repeat: no-repeat;
            background-size: cover;
            cursor: pointer;
        }
        .choose-screen {
            height: 580px;
            overflow: hidden;
            .back {
                display: none;
            }
        }
        .choose-social {
            height: 432px;
            padding-top: 85px;
            padding-bottom: 43px;
            .title {
                margin-bottom: 46px;
                
            }
            .back {
                display: block;
            }
        }
        .title {
            margin-bottom: 35px;
            text-align: center;
            font-size: 20px;
            line-height: 24px;
            letter-spacing: 0.09em;
            text-transform: uppercase;
            color: #000000;
            font-weight: 900; 
            @media (max-width: 414px) {
                margin-bottom: 10px;
            }
        }
        .options {
            margin-bottom: 30px;
            @media (max-width: 414px) {
                margin-bottom: 10px;
            }
        }
        .option {
            padding: 9px 0;
            font-size: 18px;
            line-height: 22px;
            letter-spacing: 0.015em;
            font-weight: 500;
            color: #D5D5D5;
            cursor: pointer;

            &:before {
                content: '';
                display: inline-block;
                width: 28px;
                height: 14px;
                margin-right: 10px;
                background-image: url('~@/assets/eye-closed.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
            }
            &.visible {
                color: #666666;
                &:before {
                    background-image: url('~@/assets/eye-opened.png');
                }
            }
        }
        .get-link {
            width: 100%;
            text-align: center;
            font-size: 18px;
            line-height: 62px;
            color: #fff;
            font-weight: 700;
            background: #2B2B2B;
            border-radius: 8px;
            cursor: pointer;
            transition: opacity .3s ease;
            &.disabled {
                opacity: .3;
                pointer-events: none;
            }
        }
        .link-field {
            position: relative;
            width: 100%;
            height: 71px;
            padding-left: 27px;
            padding-right: 65px;
            margin-bottom: 45px;
            background: #EFEFEF;
            border-radius: 69px;
            .share-link {
                width: 100%;
                font-size: 18px;
                line-height: 71px;
                letter-spacing: 0.015em;
                font-weight: 600;
                color: #000000;
                border: none;
                background-color: transparent;
            }
        }
        .clipboard {
            position: absolute;
            top: 10px;
            bottom: 10px;
            right: 12px;
            width: 51px;
            height: 51px;
            background-image: url('~@/assets/clipboard.png');
            background-size: cover;
            cursor: pointer;
        }
    }
    .shares {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 260px;
        margin: 0 auto 26px;
        & a {
            padding: 0 15px;
            cursor: pointer;
        }
        & img {
            max-width: 60px;
            @media (min-width: 960px) {
                max-width: 70px;
            }
        }
    }
    .delete-link {
        cursor: pointer;
        height: 25px;
        font-size: 13px;
        line-height: 16px;
        text-align: center;
        color: #FF6060;
    }
    .spinner {
        display: block;
        text-align: center;
        width: 25px;
        height: 25px;
        margin: 0 auto;
        border: 3px solid rgba(255, 96, 96, .3);
        border-radius: 50%;
        border-top-color: #FF6060;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
    }
    @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
    }
    .tooltip {
        position: relative;
        display: inline-block;
        .tooltip-text {
            visibility: hidden;
            width: 120px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            top: -40px;
            left: -35px;
            opacity: 0;
            transition: opacity 0.3s;
            &:after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }
        }
        &:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }
    }

</style>
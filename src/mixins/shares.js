const title = 'Узнайте, как прошло моё лето!'
const hashtag = 'рокетбанк'

export default {
	computed: {
        baseUrl() {
            return `https://n-martynova.github.io/summer/`
        },
		shareVk() {
			return `https://vk.com/share.php?url=${this.baseUrl}&title=${title}`
		},
		shareFb() {
            return `https://www.facebook.com/sharer.php?u=${this.baseUrl}&hashtag=${hashtag}`
		},
		shareTw() {
			let url = encodeURIComponent(this.baseUrl)
			let text = encodeURIComponent(title)

			return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtag}`
		},
	},
	methods: {
		shareClick(s) {
			this.gtag(`share to ${s}`)
		},

		linkClick(l) {  
			this.gtag(`link to ${l}`)
		},

		gtag: name => {
			if (process.env.NODE_ENV === 'development') console.log('gtag:', name)

			if (window.gtag) gtag('event', name)
		},
	},
}

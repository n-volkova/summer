import CountUp from '../components/Countup.vue'
export default {
    components: {
        CountUp
    },
	data () {
        return {
            counterInstances: [],
        }
    },
    watch: {
        isCurrent: {
            handler: function (newVal) {
                if (!this.counterInstances.length) return

                if (newVal) {
                    this.counterInstances.forEach(instance => {
                        instance.reset()
                        instance.start()
                    })
                } else {
                    this.counterInstances.forEach(instance => {
                        instance.pauseResume()
                    })
                }
            }, 
            immediate: true
        },
    },
	methods: {
		saveCounterInstance(instance) {
            this.counterInstances.push(instance)
        },
	},
}

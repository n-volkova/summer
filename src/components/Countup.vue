<template>
    <span />
</template>

<script>
    import { CountUp } from 'countup.js'

    const typeOf = type => object => Object.prototype.toString.call(object) === `[object ${type}]`
    const isFunction = typeOf('Function')

    export default {
        __countup__: CountUp,
        name: 'VueCountUp',
        props: {
            delay: {
                type: Number,
                required: false,
                default: 0,
            },
            endVal: {
                type: Number,
                required: true,
            },
            options: {
                type: Object,
                required: false,
            },
        },
        data() {
            return {
                instance: null,
            }
        },
        watch: {
            endVal: {
                handler(value) {
                    const that = this
                    if (that.instance && isFunction(that.instance.update)) {
                        that.instance.update(value)
                    }
                },
                deep: false
            }
        },
        methods: {
            create() {
                const that = this
                if (that.instance) {
                    return
                }
                const dom = that.$el
                const instance = new CountUp(
                    dom,
                    that.endVal,
                    that.options
                )
                if (instance.error) return
                
                that.instance = instance
                that.setWidth()

                setTimeout(() => that.$emit('ready', instance, CountUp), that.delay)
            },
            destroy() {
                const that = this
                that.instance = null
            },
            printValue(value) {
                const that = this
                if (that.instance && isFunction(that.instance.printValue)) {
                    return that.instance.printValue(value)
                }
            },
            setWidth() {
                const that = this
                const el = that.instance.el

                el.innerHTML = that.endVal + that.instance.options.separator + that.instance.options.suffix
                el.style.width = el.clientWidth + 'px'
                el.innerHTML = 0
            },
            start(callback) {
                const that = this
                if (that.instance && isFunction(that.instance.start)) {
                    return that.instance.start(callback)
                }
            },
            pauseResume() {
                const that = this
                if (that.instance && isFunction(that.instance.pauseResume)) {
                    return that.instance.pauseResume()
                }
            },
            reset() {
                const that = this
                if (that.instance && isFunction(that.instance.reset)) {
                    return that.instance.reset()
                }
            },
            update(newEndVal) {
                const that = this
                if (that.instance && isFunction(that.instance.update)) {
                    return that.instance.update(newEndVal)
                }
            }
        },
        mounted() {
            const that = this
            that.create()
        },
        beforeDestroy() {
            const that = this
            that.destroy()
        },
    }
</script>
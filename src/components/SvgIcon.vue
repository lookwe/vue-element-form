<template>
    <!-- $listeners 事件中间者 -->
    <svg :class="svgClass" v-on="$listeners">
        <use :xlink:href="icon_href" />
    </svg>
</template>
<script>
    export default {
        name: 'SvgIcon',
        props: {
            iconName: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            icon_href() {
                return `#icon-${this.iconName}`
            },
            // 自定义类名
            svgClass() {
                if (this.className) {
                    return 'svg-icon ' + this.className
                } else {
                    return 'svg-icon'
                }}
        }
    }
</script>
<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
<template>
    <div style="display: inline-block">
        <!--
        v-bind="$attrs" => 可以让调用者设置的属性在 我这个组件用v-bind 展开。就不用一个一个去绑定了 除props以外
        -->
        <input
            v-bind="$attrs"
            :type="type"
            :value="value"
            @input="onInput"
        />
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ""
            }
        },
        methods: {
            onInput(e) {
                this.$emit('input',e.target.value)
            }
        }
    }
</script>

<style scoped>
</style>

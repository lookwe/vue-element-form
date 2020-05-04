<template>
    <div>
        <!--
        v-bind="$attrs" => 可以让调用者设置的属性在 我这个组件用v-bind 展开。就不用一个一个去绑定了
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
        props: {
            type: {
                type: String,
                default: 'txt'
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

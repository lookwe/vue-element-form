<template>
    <div class="form-item">
        <!-- 标题-->
        <label class="label" v-if="label">{{ label }}</label>
        <!-- 提供容器 -->
        <slot></slot>
        <p v-show="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
    export default {
        name: "formItem",
        data: ()=> {
            return {
                error: ""
            }
        },
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            }
        }

    }
</script>

<style scoped>
    .error{
        color: red
    }
    .label {
        padding-right: 10px;
    }
    .form-item {
        margin: 10px 0;
    }
</style>
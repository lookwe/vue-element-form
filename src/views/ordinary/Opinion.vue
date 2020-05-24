<template>
    <div>
        <p>意见提交页  只用普通用户才能来</p>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.$store.getters.permission_routes);
        }
    }
</script>
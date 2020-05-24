<template>
    <div>
        登录页面：
        <div>
            <button @click="onLogin('admin token')">管理员登录</button>
            <button @click="onLogin('token')">普通用户登录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            onLogin(token = 'token') {
                this.$store.dispatch('user/login', token).then(res => {
                   if (res.code === 200) {
                       let { redirect } = this.$route.query || {};
                       this.$router.push({ path: redirect || '/' })
                   }
                });
            },

        }
    }
</script>

<style scoped>
    button {
        margin: 10px 10px;
    }
</style>
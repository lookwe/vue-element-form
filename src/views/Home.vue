<template>
    <div id="home">
        <h2>Vue 实战开发常用需求</h2>
        <div style="margin-bottom: 10px">
            <router-link to="/admin">管理页</router-link>
            &nbsp;&nbsp;-
            <router-link to="/about">关于页</router-link>
            &nbsp;&nbsp;-
            <router-link to="/opinion">用户意见提交页</router-link>
        </div>
        <router-view></router-view>

        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld/>

        <svg-icon icon-name="wx"></svg-icon>
        <svg-icon icon-name="denglong"></svg-icon>
        <button @click="logout">退出登录</button>
    </div>
</template>

<script>
    import HelloWorld from 'comp/HelloWorld.vue'

    export default {
        name: 'App',
        data() {
            return {
                inp: '1234'
            }
        },
        components: {
            HelloWorld
        },
        methods: {
            logout() {
                // 清除用户
                this.$store.dispatch('user/resetToken').then(() => {
                    this.$router.push({path:'/login'});
                    location.reload();
                })
            }
        }
    }
</script>

<style>
    #home {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #home .router-link-active {
        color: deepskyblue;
    }
</style>
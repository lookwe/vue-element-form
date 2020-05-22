<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <svg-icon icon-name="wx"></svg-icon>
    <svg-icon icon-name="denglong"></svg-icon>
    <el-input v-model="inp"></el-input>
  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'
import elInput from  'package/input/src/index.vue'
export default {
  name: 'App',
  data() {
    return {
      inp: '1234'
    }
  },
  components: {
    HelloWorld,
    elInput
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

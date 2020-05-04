<template>
  <div class="hello">
    <h1>{{ input }}</h1>
    <el-input v-model="input" :placeholder="placeholder"></el-input>
  </div>
</template>

<script>
  import elInput from '../packagse/input/src'
export default {
  name: 'HelloWorld',
  components:{
    elInput
  },
  props: {
    msg: String
  },
  data() {
    return {
      input: '123',
      placeholder: '我是弱提示...'
    }
  }
}
</script>


<style scoped>

</style>

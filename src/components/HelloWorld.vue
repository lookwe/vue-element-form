<template>
  <div class="hello">
    <h3>当前角色：{{ $store.getters.roles }}</h3>
    <h2>{{ input }}</h2>
    <el-form-item label="姓名">
      <el-input v-model="input" :placeholder="placeholder"></el-input>
    </el-form-item>

    <el-form-item label="密码">
      <el-input v-model="pwd" type="password" :placeholder="placeholder"></el-input>
    </el-form-item>
  </div>
</template>

<script>
  //package 自定义别名
  import elInput from 'package/input/src'
  import elFormItem from '../packagse/form-item/src'

export default {
  name: 'HelloWorld',
  components:{
    elInput,elFormItem
  },
  props: {
    msg: String
  },
  data() {
    return {
      input: '123',
      pwd: '123',
      placeholder: '我是弱提示...'
    }
  }
}
</script>


<style scoped>

</style>

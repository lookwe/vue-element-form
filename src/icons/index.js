import Vue from 'vue'
import SvgIcon from 'comp/SvgIcon.vue'

// 让vue 动态自动加载  获取一个 /svg目录 为上下文 获取所有 .svg 文件

const req = require.context('./svg', false, /\.svg$/);

//获取当前目录中所有文件名 并让req函数加载他们
req.keys().map(req);

// vue 注册组件
Vue.component('svg-icon', SvgIcon);

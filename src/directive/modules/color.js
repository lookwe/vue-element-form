import Vue from 'vue'
/*
* 1.定义指令的别名
* 2.对象 对象里放相关的钩子函数 如初始化、运行期间
* */
Vue.directive("color", {
    /***
     * 初始化 只执行一次 可以设置一下初始化操作
     * @param el 指令后的元素
     * @param binding  执行后相关的回调参数。如：页面传来的值，或指令名
     */
    bind: function (el, binding) {
        console.log(binding);
        /***
         * binding接受值如下：
         * name: "color" 指令别名缩写
         rawName: "v-color"  指令完成名
         value: "red"   v-别名="" 表达式后运行后的值 如： v-别名="1+1" 收到是 数字2
         expression: "'red'"   如： v-别名="1+1" 收到是 字符串 “1+1”
         * @type {any}
         */
        el.style.color = binding.value
    },

    // 当绑定的元素插入DOM中时触发
    inserted: function () {

    },

    //绑定元素所在的组件中，组件方法改变时触发 可能在组件的子组件前面提前触发
    update() {

    },

    //等所有的组件更新完成后 在触发
    componentUpdated() {},

    //元素解除绑定是触发 只执行一次
    unbind(){}
});
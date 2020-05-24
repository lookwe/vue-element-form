import Vue from 'vue'
import store from "@/store";
/*
* 1.定义指令的别名
* 2.对象 对象里放相关的钩子函数 如初始化、运行期间
* */

Vue.directive("permission", {
    // 元素插入时候出发 binding 用户使用指令传来的相关参数
    inserted(el, binding) {
        // 获取指令的值：按钮要求的角色数组  取出结构赋值 定义别名pRoles接收
        const { value:pRoles } = binding;

        // 获取用户角色
        const roles = store.getters && store.getters.roles;

        if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
            // 判断用户角色中是否有按钮要求的角色
            const hasPermission = roles.some(role => {
                return pRoles.includes(role);
            });

            // 如果没有权限则删除当前dom
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`);
        }
    }
});

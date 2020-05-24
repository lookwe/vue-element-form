<template>
    <div>
        <h4>只要登录成功。而且是admin。或者 editor 才能看到</h4>
         <div>
             <button v-permission="['admin']">批量删除</button>
             &nbsp;
             <button v-permission="['ordinary']">举报管理员</button>
             &nbsp;
             <button>查询</button>
         </div>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.$store.getters.permission_routes);
        }
    }
</script>
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
    {
        path: "/login",
        component: () => import("@/views/Login"),
        hidden: true // 导航菜单忽略该项
    },
    {   path: '*',
        component: resolve => require(['@/views/error/404.vue'], resolve),
        meta: { title: "404",icon: "qq" },
        hidden: true
    }
];


// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
    {
        path: "/",
        component: () =>
            import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "home",
        meta: {
            title: "Home",
            icon: "qq"
        },
        children: [
            {
                path: "/admin",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/admin/Admin.vue"),
                name: "admin",
                meta: {
                    title: "admin",
                    icon: "denglong",
                    roles: ['admin'] //只用管理员可看
                },
            },
            {
                path: "/opinion",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/ordinary/Opinion.vue"),
                name: "opinion",
                meta: {
                    title: "Opinion",
                    icon: "denglong",
                    roles: ['ordinary'] // 只用普通用户能看
                },
            },
            {
                path: "/about",
                component: () =>
                    import(/* webpackChunkName: "home" */ "@/views/compose/About.vue"),
                name: "about",
                meta: {
                    title: "About",
                    icon: "denglong",
                    roles: ['ordinary','admin'] // 规定角色可看
                },
            }
        ]
    }
];

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: constRoutes
});
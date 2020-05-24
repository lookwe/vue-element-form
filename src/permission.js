import router from './router'
import store from './store'

const whiteList = ['/login'];   // 不需要权限

// 进入之前
router.beforeEach(async (to, from, next) => {
    // 假设获取token
    const hasToken = localStorage.getItem('token');
    if (hasToken) {
        if (to.path === "/login") {
            // 已经登录，访问login 直接跳转首页 除非手动删除路由
            next('/')
        }
        else {
            // 查看vuex 中 用户是否有角色信息
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                // 说明用户已获取过角色信息，放行
                next()
            }
            // 登录成功 没有角色
            else {
                try {
                    // // 先请求获取用户信息
                    const { roles } = await store.dispatch('user/getInfo');

                    // 根据当前用户角色过滤出可访问路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles);

                    // 添加至路由器
                    router.addRoutes(accessRoutes);

                    // // 继续路由切换，确保addRoutes完成
                     next({ ...to, replace: true })
                } catch (error) {
                    // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
                    await store.dispatch('user/resetToken');
                    next(`/login?redirect=${to.path}`);
                    alert(error || '未知错误')
                }
            }
        }
    }

    // 没有登录情况下
    else {
        // 如果在白名单中就放它过去
        if (whiteList.includes(to.path)) {
            next();
        }
        else {
            // 登录之后才能去指定页面
            next(`/login?redirect=${to.path}`)
        }
    }
});

// 完成之后
router.afterEach();
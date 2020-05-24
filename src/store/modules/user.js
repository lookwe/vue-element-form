// 模拟更具token获取角色列表
function  getUserRoles(token) {
    return new Promise(resolve => {
        let roles = ['ordinary'];
        if (token === 'admin token') {
            roles = ['admin']
        }
        resolve({ data: roles, code: 200, msg: '请求成功'})
    })
}

export default {
    namespaced: true, // 设置独立命名空间 防止命名冲突

    state: {
        name: '张三',
        token: localStorage.getItem('token'),
        // 角色列表
        roles: []
    },

    mutations: {
        editName(state, newName) {
            state.name = newName
        },
        setToken: (state, token) => {
            state.token = token;
        },
        setRoles: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        updateName({ commit }, newName) {
            commit('editName', newName)
        },

        login({ commit }, token) {
            localStorage.setItem('token', token);
            commit("setToken", token);
            return { code: 200, msg: '授权成功' }
        },

        getInfo({ commit, state }) {
            // 模拟更具token 查询用户角色数组
            return getUserRoles(state.token).then(({data: roles}) => {
                commit("setRoles", roles);
                return {roles}
            })
        },

        resetToken({ commit }) {
            // 模拟清空令牌和角色状态
            return new Promise(resolve => {
                commit("setToken", "");
                commit("setRoles", []);
                localStorage.removeItem('token');
                resolve();
            });
        }
    }
}
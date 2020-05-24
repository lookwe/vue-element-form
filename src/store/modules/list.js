export default {
    namespaced: true, // 设置独立命名空间 防止命名冲突
    state: {
        listName: '数组'
    },

    getters: {
        listName: state => state.listName
    },

    mutations: {
        editName(state, newName) {
            state.listName = newName
        }
    },

    action: {
        updateName({ commit }, newName) {
            commit('editName', newName)
        }
    }
}
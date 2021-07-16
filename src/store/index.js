import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 共享数据
        city: localStorage.getItem('position1'),
        //购物车角标
        badge: localStorage.getItem('badge')
    },
    mutations: {
        // 修改数据
        setCity(state, data) {
            state.city = data;
        },
        // 修改角标
        setBadge(state, data) {
            state.badge = data;
        }
    },
    actions: {},
    modules: {}
});
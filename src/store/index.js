import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 共享数据
        city: localStorage.getItem('position1')
    },
    mutations: {
        // 修改数据
        setCity(state, data) {
            state.city = data;
        }
    },
    actions: {},
    modules: {}
});
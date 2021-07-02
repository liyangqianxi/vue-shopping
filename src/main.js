import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// vant
import Vant from 'vant';
import 'vant/lib/index.css';
// 把api把api挂载成全局变量
import api from './http/api';

// 把api挂载成全局变量
Vue.prototype.$api = api;
//vant
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
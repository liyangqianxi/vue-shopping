import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 封装的判断登录、搜索历史、浏览记录等
import utils from './utils';
import Top from './components/top/Top';

// vant
import Vant from 'vant';
import 'vant/lib/index.css';

// 把api把api挂载成全局变量
import api from './http/api';

import { Button } from 'vant';
import { DatetimePicker } from 'vant';
import { Popup } from 'vant';
import { Field } from 'vant';

// 把api挂载成全局变量
Vue.prototype.$api = api;
Vue.component('Top', Top);
//vant
Vue.use(Vant);

// 封装的判断登录、搜索历史、浏览记录等
Vue.prototype.$utils = utils;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
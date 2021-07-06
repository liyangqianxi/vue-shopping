// 封装所有的请求
import http from './index';

export default {
    // 传参数都传成功对象的方式
    // login({ username, password }) {
    //     return http.post('/login', {
    //         username,
    //         password
    //     });
    // },
    // 验证码
    verify() {
        return http.get('/verify');
    },
    // 登录
    login({ nickname, password, verify }) {
        return http.post('/login', {
            nickname,
            password,
            verify
        });
    },
    // 注册
    register({ nickname, password, verify }) {
        return http.post('/register', {
            nickname,
            password,
            verify
        });
    },

    // 首页全部数据
    recommend() {
        return http.get('/recommend');
    },
    // 单个商品详情
    goods() {
        return http.get(`/goods/one?id=${id}`);
    }
};
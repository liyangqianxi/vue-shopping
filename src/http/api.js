// 封装所有的请求
import http from './index';

export default {
    // 传参数都传成功对象的方式
    login({ username, password }) {
        return http.post('/login', {
            username,
            password
        });
    }
};
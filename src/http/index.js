// 封装axios
import axios from 'axios';
import { Toast } from 'vant';

let http = axios.create({
    // 基础路径
    baseURL: '/api',
    // 超时时间
    timeout: 1000
});

// 响应拦截
// 处理每次请求的结果(成功和失败)
http.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        // 每次请求失败的状态码
        let status = err.response && err.response.status;
        if (status === 400) {
            Toast.fail('参数错误');
        }
        if (status === 401) {
            Toast.fail('登录过期');
        }
        if (status === 403) {
            Toast.fail('没有全选');
        }
        if (status === 404) {
            Toast.fail('路径错误');
        }
        if (status === 500) {
            Toast.fail('服务器错误');
        }
        if (status === 503) {
            Toast.fail('服务器维护');
        }
        return Promise.reject(err);
    }
);

export default http;
// 模块化(es6提供): esmodule
// 导入和导出
// 其余文件可以使用到该文件的变量和方法

// export default: 默认导出 导出变量 数组 对象 方法 只能导出一次
// export: 导出 导出变量 数组 对象 方法 但是要加let或者const 能导出多次

import { Dialog, Toast } from 'vant';
// 导入路由
import router from '../router';

export default {
    // 检测用户是否登录
    // key: 本地存储用户信息的key
    // next: 传入一个函数 下一步的操作
    // item: next函数需要的参数
    checkLogin({ key, next, item }) {
        // 检测本地有没有用户信息

        let user = localStorage.getItem(key);
        if (user) {
            // 已经登录
            // 继续下一步操作
            next(item);
        } else {
            // 未登录
            Dialog.confirm({
                    title: '检测到您未登录',
                    message: '是否立即跳转到登录页面?'
                })
                .then(() => {
                    // 跳转到登录页
                    router.push('/login');
                })
                .catch(() => {
                    Toast('您取消了操作');
                });
        }
    },

    // 存储记录(浏览历史(browse) 搜索历史(search)...)
    // key: 存储的名字
    // attr: 判断元素是否存在的属性名
    saveHistory({ user, key, data, attr }) {
        // 如果是其余的数据 判断的属性可能就不叫name了

        // 拼接一个名字

        let name = user + key + 'History';
        let history = localStorage.getItem(name);
        if (history) {
            // 之前已经存储过了
            let arr = JSON.parse(localStorage.getItem(name));
            // 检测数据是否已经存在
            let item = null;
            if (typeof data === 'string') {
                item = arr.find(i => {
                    return i[attr] === data;
                });
            } else {
                item = arr.find(i => {
                    return i[attr] === data[attr];
                });
            }
            // 数组当中没有当前数据
            if (!item) {
                if (typeof data === 'string') {
                    let obj = {
                        [attr]: data
                    };
                    arr.push(obj);
                } else {
                    arr.push(data);
                }
                localStorage.setItem(name, JSON.stringify(arr));
            }
        } else {
            // 第一次存储
            // 把存储的数据都转换成对象
            let arr = [];
            if (typeof data === 'string') {
                let obj = {
                    name: data
                };
                arr.push(obj);
            } else {
                arr.push(data);
            }
            localStorage.setItem(name, JSON.stringify(arr));
        }
    },
    // 获取存储记录
    getHistory({ key }) {
        let name = key + 'History';
        let arr = localStorage.getItem(name);
        if (arr) return JSON.parse(arr);
        else return null;
    }
};
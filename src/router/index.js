import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
        //登录
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/login.vue')
    },
    {
        path: '',
        component: layout,
        children: [{
                path: '/',
                name: 'home',
                component: home,
                meta: {
                    title: '首页',
                    index: '/'
                }
            },
            {
                path: '/classify',
                name: 'classify',
                component: () =>
                    import ('../views/classify/classify.vue'),
                meta: {
                    title: '分类',
                    index: '/classify'
                }
            },
            {
                path: '/shop',
                name: 'shop',
                component: () =>
                    import ('../views/shop/shop.vue'),
                meta: {
                    title: '购物车',
                    index: '/shop'
                }
            },
            {
                path: '/mine',
                name: 'mine',
                component: () =>
                    import ('../views/mine/mine.vue'),
                meta: {
                    title: '我的',
                    index: '/mine'
                }
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
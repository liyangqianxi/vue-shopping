import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../views/layout/Layout.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/layout'
    },
    {
        //登录
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/login/Login.vue')
    },
    {
        path: '/orientation',
        name: 'Orientation',
        component: () =>
            import ('../views/orientation/Orientation.vue'),
        meta: {
            title: '定位详情',
            index: '/orientation'
        }
    },

    {
        path: '/single',
        name: 'Single',
        component: () =>
            import ('../views/single/Single.vue'),
        meta: {
            title: '单个商品详情',
            index: '/single'
        }
    },

    {
        path: '/layout',
        component: Layout,
        children: [{
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: '首页',
                    index: '/'
                }
            },
            {
                path: '/classify',
                name: 'Classify',
                component: () =>
                    import ('../views/classify/Classify.vue'),
                meta: {
                    title: '分类',
                    index: '/classify'
                }
            },
            {
                path: '/shop',
                name: 'Shop',
                component: () =>
                    import ('../views/shop/Shop.vue'),
                meta: {
                    title: '购物车',
                    index: '/shop'
                }
            },
            {
                path: '/mine',
                name: 'Mine',
                component: () =>
                    import ('../views/mine/Mine.vue'),
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
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;
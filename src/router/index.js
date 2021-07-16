import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../views/layout/Layout.vue';

Vue.use(VueRouter);

const routes = [{
        //登录
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/login/Login.vue')
    },
    {
        path: '/appraise',
        name: 'Appraise',
        component: () =>
            import ('../components/mine/evaluate/Appraise.vue'),
        meta: {
            title: '评论详情',
            index: '/appraise'
        }
    },
    {
        path: '/comment',
        name: 'Comment',
        component: () =>
            import ('../components/mine/evaluate/Comment .vue'),
        meta: {
            title: '评论中心',
            index: '/comment'
        }
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
        path: '/browse',
        name: 'Browse',
        component: () =>
            import ('../views/mine/browse/Browse.vue'),
        meta: {
            title: '最近浏览',
            index: '/browse'
        }
    },
    {
        path: '/complete',
        name: 'Complete',
        component: () =>
            import ('../views/mine/complete/Complete.vue'),
        meta: {
            title: '已完成订单',
            index: '/complete'
        }
    },
    {
        path: '/enshrine',
        name: 'Enshrine',
        component: () =>
            import ('../views/mine/enshrine/Enshrine.vue'),
        meta: {
            title: '收藏',
            index: '/enshrine'
        }
    },
    {
        path: '/entire',
        name: 'Entire',
        component: () =>
            import ('../views/mine/entire/Entire.vue'),
        meta: {
            title: '全部订单',
            index: '/entire'
        }
    },
    {
        path: '/evaluate',
        name: 'Evaluate',
        component: () =>
            import ('../views/mine/evaluate/Evaluate.vue'),
        meta: {
            title: '待评价',
            index: '/evaluate'
        }
    },
    {
        path: '/options',
        name: 'Options',
        component: () =>
            import ('../views/mine/options/Options.vue'),
        meta: {
            title: '设置',
            index: '/options'
        }
    },
    {
        path: '/site',
        name: 'Site',
        component: () =>
            import ('../views/mine/site/Site.vue'),
        meta: {
            title: '地址管理',
            index: '/site'
        }
    },
    {
        path: '/increased',
        name: 'Increased',
        component: () =>
            import ('../components/mine/site/Increased.vue'),
        meta: {
            title: '新增地址',
            index: '/increased'
        }
    },
    {
        path: '/immediately',
        name: 'Immediately',
        component: () =>
            import ('../components/single/Immediately.vue'),
        meta: {
            title: '订单结算',
            index: '/immediately'
        }
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () =>
            import ('../components/mine/site/Setting.vue'),
        meta: {
            title: '编辑地址',
            index: '/setting'
        }
    },

    {
        path: '',
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
    let name = localStorage.getItem('nickname');
    if (name) {
        next();
    } else {
        if (
            to.path === '/login' ||
            to.path === '/mine' ||
            to.path === '/shop' ||
            to.path === '/classify' ||
            to.path === '/' ||
            to.path === '/orientation' ||
            to.path === '/single'
        ) {
            next();
        } else {
            next('/');
        }
    }
});

export default router;
<template>
    <!-- 标签栏 -->
    <div>
        <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" fixed border z-index="1">
            <van-tabbar-item :badge="item.title == '购物车' ? getCartBadge:''" v-for="(item,index) in tabbar" :key="index" :to="item.url">
                <span>{{item.title}}</span>
                <template #icon="props">
                    <img :src="!props.active ? item.icon : item.select_icon" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data () {
        return {
            active: 0,
            tabbar: [
                {
                    title: '首页',
                    icon: require("@/assets/home.png"),
                    select_icon: require("@/assets/home-selected.png"),
                    url: '/'
                },
                {
                    title: '分类',
                    icon: require("@/assets/category.png"),
                    select_icon: require("@/assets/category-selected.png"),
                    url: '/classify'
                },
                {
                    title: '购物车',
                    icon: require("@/assets/cart.png"),
                    select_icon: require("@/assets/cart-selected.png"),
                    url: '/shop'
                },
                {
                    title: '我的',
                    icon: require("@/assets/mine.png"),
                    select_icon: require("@/assets/mine-selected.png"),
                    url: '/mine'
                }
            ]
        }
    },
    components: {},
    methods: {},
    mounted () { },
    computed: {
        getCartBadge () {
            return 3;
        }
    },
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>

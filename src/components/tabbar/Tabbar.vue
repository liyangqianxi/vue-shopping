<template>
    <!-- 标签栏 -->
    <div>
        <div class="box">
            <div class="tail">
                <van-tabbar route active-color="#ee0a24" inactive-color="#000" fixed border z-index="1">
                    <van-tabbar-item replace to="/" icon="wap-home-o">商城</van-tabbar-item>
                    <van-tabbar-item replace to="/classify" icon="wap-nav">分类</van-tabbar-item>
                    <van-tabbar-item replace to="/shop" icon="shopping-cart" :badge="get">购物车</van-tabbar-item>
                    <van-tabbar-item replace to="/mine" icon="manager-o">我的</van-tabbar-item>
                </van-tabbar>
            </div>
        </div>
    </div>
</template>

<script>
import Home from '../../views/Home'
import Classify from '../../views/classify/Classify'
import shop from '../../views/shop/Shop'
import mine from '../../views/mine/Mine'
export default {
    name: "",
    props: {},
    data () {
        return {
            active: 0,
        };
    },
    components: {
        Home,
        Classify,
        shop,
        mine
    },
    methods: {
    },
    mounted () { },
    computed: {
        get () {
            if (localStorage.getItem("nickname") !== null) {
                if (this.$store.state.badge == 0) {
                    return ""
                } else {
                    return this.$store.state.badge
                }
            }
        }
    },
    watch: {},
};
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
}
</style>

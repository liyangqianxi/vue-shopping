<template>
    <!-- 购物车未登录 -->
    <div>
        <div class="shop">
            <img src="../../assets/order.gif" alt />
        </div>
        <div class="text">暂无商品</div>
        <div class="stroll">
            <van-button round type="danger" class="bottom-button" block @click="goto('/')">去逛逛</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data () {
        return {
        }
    },
    components: {},
    methods: {
        // 返回
        goto (val) {
            this.$router.push(val)
        },
    },
    mounted () { },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.shop {
    img {
        width: 375px;
    }
}
.text {
    width: 65px;
    margin: 50px auto;
}
.stroll {
    width: 100%;
    position: fixed;
    bottom: 60px;
}
</style>

<template>
    <!-- 已完成订单 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">我的订单</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div>
            <van-tabs v-model="active">
                <van-tab title="待付款">内容 1</van-tab>
                <van-tab title="待发货">内容 2</van-tab>
                <van-tab title="待收货">内容 3</van-tab>
                <van-tab title="待评价">内容 4</van-tab>
                <van-tab title="已完成">
                    <finish></finish>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import Finish from '../../../components/mine/entire/Finish.vue'

export default {
    name: '',
    props: {},
    data () {
        return {
            active: 4,
        }
    },
    components: { Finish },
    methods: {
        // 返回
        goto () {
            this.$router.push('/mine')
        },
    },
    mounted () { },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>

<template>
    <!-- 全部订单 -->
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
        <finish></finish>
    </div>
</template>

<script>
import Finish from '../../../components/mine/entire/Finish.vue'
export default {
    name: '',
    props: {},
    data () {
        return {

        }
    },
    components: { Finish },
    methods: {
        // 返回
        goto () {
            this.$router.back()
        },

    },
    mounted () {

    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>

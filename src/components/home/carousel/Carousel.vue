<template>
    <!-- 轮播图 -->
    <div id="carousel">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in list" :key="item">
                <img :src="item" alt />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
        }
    },
    components: {},
    methods: {

    },
    mounted () {
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
#carousel {
    width: 100%;
    img {
        width: 375px;
        height: 200px;
    }
}
.my-swipe van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 200px;
    text-align: center;
    background-color: #39a9ed;
}
</style>

